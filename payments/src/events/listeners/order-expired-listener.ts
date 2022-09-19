import {
  Listener,
  Subjects,
  OrderExpiredEvent,
  OrderStatus,
} from '@luxury-store/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderExpiredListener extends Listener<OrderExpiredEvent> {
  readonly subject = Subjects.OrderExpired;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderExpiredEvent['data'], msg: Message) {
    const existingOrder = await Order.findById(data.id);
    if (!existingOrder) {
      throw new Error('order not found');
    }
    existingOrder.set({ status: OrderStatus.Expired });
    msg.ack();
  }
}
