import Queue from 'bull';
import { OrderExpiredPublisher } from '../events/publishers/order-expired-publisher';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
  id: string;
  version: number;
  product: {
    id: string;
  };
}

const expirationQueue = new Queue<Payload>('order:expired', {
  redis: {
    host: '127.0.0.1:6379',
  },
});
expirationQueue.process(async (job) => {
  console.log(expirationQueue);
  await new OrderExpiredPublisher(natsWrapper.client).publish({
    id: job.data.id,
    version: job.data.version,
    product: {
      id: job.data.product.id,
    },
  });
});

export { expirationQueue };
