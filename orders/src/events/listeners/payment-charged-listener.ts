import { natsWrapper } from './../../nats-wrapper';
import {
  Listener,
  Subjects,
  PaymentChargedEvent,
  OrderStatus,
} from '@luxury-store/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';
import { OrderCompletedPublisher } from '../publishers/order-completed-publisher';

export class PaymentChargedListener extends Listener<PaymentChargedEvent> {
  readonly subject = Subjects.PaymentCharged;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentChargedEvent['data'], msg: Message) {
    const existingOrder = await Order.findById(data.orderId).populate(
      'product'
    );
    if (!existingOrder) {
      throw new Error('order not found');
    }
    existingOrder.set({ status: OrderStatus.Complete });
    await existingOrder.save();

    await new OrderCompletedPublisher(natsWrapper.client).publish({
      id: existingOrder._id,
      version: existingOrder.version,
      product: {
        id: existingOrder.product.id,
      },
    });
    msg.ack();
  }
}
