import {
  Listener,
  OrderCreatedEvent,
  ProductStatus,
  Subjects,
} from '@luxury-store/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/product';
import { queueGroupName } from './queue-group-name';
import { ProductUpdatedPublisher } from '../publishers/product-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const productId = data.product.id;
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      throw new Error('product not found');
    }
    existingProduct.set({ status: ProductStatus.RESERVED });
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
