import express from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler } from '@luxury-store/common';
import { NotFoundError } from '@luxury-store/common';
import { currentUser } from '@luxury-store/common';

import { productsQueryRouter } from './routes/all';

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

app.use(productsQueryRouter);

app.all('*', () => {
  throw new NotFoundError('Route does not exist');
});

app.use(errorHandler);

export { app };
