import { Listener, OrderCreatedEvent, Subjects } from '@luxury-store/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      version: data.version,
      price: data.product.price,
      userId: data.userId,
      status: data.status,
    });
    await order.save();
    msg.ack();
  }
}
