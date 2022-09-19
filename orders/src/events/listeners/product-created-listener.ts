import { Listener, ProductCreatedEvent, Subjects } from '@luxury-store/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ProductCreated;
  async onMessage(data: ProductCreatedEvent['data'], msg: Message) {
    const product = Product.build(data);

    await product.save();

    msg.ack();
  }
}
