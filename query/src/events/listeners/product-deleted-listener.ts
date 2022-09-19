import { Listener, ProductDeletedEvent, Subjects } from '@luxury-store/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { client } from '../../redis/redis-client';
import { productsKey } from '../../redis/keys';

export class ProductDeletedListener extends Listener<ProductDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ProductDeleted;
  async onMessage(data: ProductDeletedEvent['data'], msg: Message) {
    await client.del(productsKey(data.id));
    msg.ack();
  }
}
