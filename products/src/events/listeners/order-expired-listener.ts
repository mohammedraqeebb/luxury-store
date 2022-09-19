import {
  Listener,
  Subjects,
  OrderExpiredEvent,
  ProductStatus,
} from '@luxury-store/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';
import { ProductUpdatedPublisher } from '../publishers/product-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';
import { idText } from 'typescript';

export class OrderExpiredListener extends Listener<OrderExpiredEvent> {
  readonly subject = Subjects.OrderExpired;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderExpiredEvent['data'], msg: Message) {
    const existingProduct = await Product.findById(data.product.id);
    if (!existingProduct) {
      throw new Error('product not found');
    }
    if (existingProduct.status === ProductStatus.SOLD) {
      return msg.ack();
    }
    existingProduct.set({ status: ProductStatus.AVAILABLE });
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
