import { Listener, ProductCreatedEvent, Subjects } from '@luxury-store/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { client } from '../../redis/redis-client';
import { productsKey } from '../../redis/keys';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ProductCreated;
  async onMessage(data: ProductCreatedEvent['data'], msg: Message) {
    await client.json.set(productsKey(data.id), '$', {
      name: data.name,
      description: data.description,
      gender: data.gender,
      category: data.category,
      images: data.images,
      brand: data.brand,
      price: data.price,
      userId: data.userId,
      version: 0,
      status: data.status,
      originalPrice: data.originalPrice,
    });

    const product = await client.json.get(productsKey(data.id));
    console.log(product);

    msg.ack();
  }
}
