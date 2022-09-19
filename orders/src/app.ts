import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import 'express-async-errors';
import { errorHandler, NotFoundError, currentUser } from '@luxury-store/common';

import { createOrderRouter } from './routes/create';
import { getOrderRouter } from './routes/read';
import { cancelOrderRouter } from './routes/cancel';
import { indexOrderRouter } from './routes';

const app = express();

app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUser);

app.use(createOrderRouter);
app.use(getOrderRouter);
app.use(cancelOrderRouter);
app.use(indexOrderRouter);

app.all('*', () => {
  throw new NotFoundError('Route does not exist');
});

app.use(errorHandler);

export { app };
