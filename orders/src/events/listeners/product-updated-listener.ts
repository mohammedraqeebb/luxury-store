import { Listener, ProductUpdatedEvent, Subjects } from '@luxury-store/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ProductUpdated;
  async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
    const product = await Product.findBySequence({
      id: data.id,
      version: data.version,
    });

    if (!product) {
      throw new Error('product not found');
    }

    product.set({
      name: data.name,
      price: data.price,
      originalPrice: data.originalPrice,
      description: data.description,
      gender: data.gender,
      images: data.images,
      status: data.status,
      category: data.category,
      brand: data.brand,
    });
    await product.save();

    msg.ack();
  }
}
