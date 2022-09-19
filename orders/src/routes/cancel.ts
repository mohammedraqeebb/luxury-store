import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from '@luxury-store/common';
import { Order } from '../models/order';

const router = express.Router();

router.put(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const existingOrder = await Order.findById(req.params.orderId).populate(
      'product'
    );

    if (!existingOrder) {
      throw new NotFoundError('order not found');
    }
    if (existingOrder.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    existingOrder.set({ status: OrderStatus.Cancelled });
    await existingOrder.save();

    res.send(existingOrder);
  }
);

export { router as cancelOrderRouter };
