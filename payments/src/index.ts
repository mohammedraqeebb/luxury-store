import { app } from './app';
import mongoose from 'mongoose';

import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderExpiredListener } from './events/listeners/order-expired-listener';
import { natsWrapper } from './nats-wrapper';

const startServer = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
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

    natsWrapper.client.on('close', () => {
      console.log('nats connection closed');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderExpiredListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log('payments connected to its database');
  } catch (err) {
    console.log('error', err);
  }

  app.listen(5000, () => {
    console.log('payments listening to port 5000');
  });
};

startServer();
