import { app } from './app';
import { natsWrapper } from './nats-wrapper';

import { ProductCreatedListener } from './events/listeners/product-created-listener';
import { ProductDeletedListener } from './events/listeners/product-deleted-listener';
import { ProductUpdatedListener } from './events/listeners/product-updated-listener';
import { client } from './redis/redis-client';
import { createProductsIndex } from './redis/products-index';

const startServer = async () => {
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    client.connect();
    client.on('connect', () => {
      console.log('connected to redis');
    });

    await createProductsIndex();

    new ProductCreatedListener(natsWrapper.client).listen();
    new ProductUpdatedListener(natsWrapper.client).listen();
    new ProductDeletedListener(natsWrapper.client).listen();

    process.on('SIGTERM', () => natsWrapper.client.close());
    process.on('SIGINT', () => natsWrapper.client.close());
  } catch (error) {
    console.log('error', error);
  }

  app.listen(8000, () => {
    console.log('query listening to port 8000');
  });
};

startServer();
