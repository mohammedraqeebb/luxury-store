import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from '@luxury-store/common';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { Payment } from '../models/payment';
import { PaymentChargedPublisher } from '../events/publishers/payment-charged-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  // [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      throw new NotFoundError('order not found');
    }
    if (existingOrder.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (existingOrder.status === OrderStatus.Cancelled) {
      throw new BadRequestError('cannot pay for  cancelled order');
    }
    if (existingOrder.status === OrderStatus.Expired) {
      throw new BadRequestError('order expired');
    }

    const charge = await stripe.paymentIntents.create({
      amount: existingOrder.price,
      currency: 'inr',
      payment_method_types: ['card'],
    });
    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });
    existingOrder.set({ status: OrderStatus.Complete });
    await existingOrder.save();
    await payment.save();

    new PaymentChargedPublisher(natsWrapper.client).publish({
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ payment });
  }
);

export { router as createChargeRouter };
