import { Listener, ProductUpdatedEvent, Subjects } from '@luxury-store/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { client } from '../../redis/redis-client';
import { productsKey } from '../../redis/keys';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ProductUpdated;
  async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
    const product = await client.json.get(productsKey(data.id));

    //@ts-ignore
    if (product.version !== data.version - 1) {
      return;
    }

    await client.json.arrAppend(productsKey(data.id), '$', {
      name: data.name,
      description: data.description,
      gender: data.gender,
      category: data.category,
      images: data.images,
      brand: data.brand,
      price: data.price,
      status: data.status,
      version: data.version,
      originalPrice: data.originalPrice,
    });

    msg.ack();
  }
}
