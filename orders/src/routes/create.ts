import express, { Request, Response } from 'express';
import {
  NotFoundError,
  requireAuth,
  validateRequest,
  BadRequestError,
  OrderStatus,
  ProductStatus,
} from '@luxury-store/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';
// import { expirationQueue } from '../queues/order-expiration-queue';
import { OrderExpiredPublisher } from '../events/publishers/order-expired-publisher';

const router = express.Router();

const ORDER_TIMER_WINDOW = 30;

router.post(
  '/api/orders/create',
  requireAuth,
  body('productId')
    .custom((productId) => mongoose.Types.ObjectId.isValid(productId))
    .withMessage('enter valid productid'),
  validateRequest,
  async (req: Request, res: Response) => {
    const existingProduct = await Product.findById(req.body.productId);
    if (!existingProduct) {
      throw new NotFoundError('product does not exist');
    }

    if (existingProduct.cannotBePurchased()) {
      throw new BadRequestError('the product is reserved');
    }
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + ORDER_TIMER_WINDOW);

    const order = Order.build({
      userId: req.currentUser!.id,
      product: existingProduct,
      expiresAt: expiration,
      status: OrderStatus.AwaitingPayment,
    });

    await order.save();

    await new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order._id,
      userId: req.currentUser!.id,
      status: OrderStatus.AwaitingPayment,
      version: order.version,
      expiresAt: order.expiresAt.toISOString(),
      product: {
        id: existingProduct._id,
        price: existingProduct.price,
        name: existingProduct.name,
      },
    });
    const delay = new Date(order.expiresAt).getTime() - new Date().getTime();

    // expirationQueue.add(
    //   {
    //     id: order._id,
    //     version: order.version,
    //     product: {
    //       id: existingProduct._id,
    //     },
    //   },
    //   {
    //     delay,
    //   }
    // );
    setTimeout(async () => {
      // if (order.status === OrderStatus.Complete) {
      //   return;
      // }

      await new OrderExpiredPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        product: {
          id: order.product.id,
        },
      });
    }, delay);

    res.send({ order });
  }
);

export { router as createOrderRouter };
