import { app } from './app';
import mongoose from 'mongoose';

const startServer = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be define');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('auth connected to its database');
  } catch (err) {
    console.log('error', err);
  }
  app.listen(1000, () => {
    console.log('Auth listening to port 1000');
  });
};

startServer();
