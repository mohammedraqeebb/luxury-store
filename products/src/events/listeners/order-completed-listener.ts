import {
  Listener,
  Subjects,
  OrderCompletedEvent,
  ProductStatus,
} from '@luxury-store/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';
import { ProductUpdatedPublisher } from '../publishers/product-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class OrderCompletedListener extends Listener<OrderCompletedEvent> {
  readonly subject = Subjects.OrderCompleted;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCompletedEvent['data'], msg: Message) {
    const existingProduct = await Product.findById(data.product.id);
    if (!existingProduct) {
      throw new Error('product not found');
    }
    existingProduct.set({ status: ProductStatus.SOLD });
    await existingProduct.save();
    await new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: existingProduct._id,
      name: existingProduct.name,
      price: existingProduct.price,
      originalPrice: existingProduct.originalPrice,
      description: existingProduct.description,
      images: existingProduct.images,
      gender: existingProduct.gender,
      status: existingProduct.status,
      version: existingProduct.version,
      category: existingProduct.category,
      brand: existingProduct.brand,
    });
    msg.ack();
  }
}
