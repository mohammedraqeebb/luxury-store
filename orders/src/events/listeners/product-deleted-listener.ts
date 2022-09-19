import { Listener, ProductDeletedEvent, Subjects } from '@luxury-store/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';

export class ProductDeletedListener extends Listener<ProductDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ProductDeleted;
  async onMessage(data: ProductDeletedEvent['data'], msg: Message) {
    const existingProduct = await Product.findById(data.id);

    if (!existingProduct) {
      throw new Error('product not found');
    }
    await Product.findByIdAndDelete(existingProduct._id);

    msg.ack();
  }
}
