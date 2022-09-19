import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import cors from 'cors';

import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from '@luxury-store/common';
import { NotFoundError } from '@luxury-store/common';
import { profileNameRouter } from './routes/name';
import { googleSigninRouter } from './routes/google-sigin';

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(googleSigninRouter);
app.use(profileNameRouter);

app.all('*', () => {
  throw new NotFoundError('Route does not exist');
});

app.use(errorHandler);

export { app };
