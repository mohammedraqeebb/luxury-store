import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import 'express-async-errors';
import { errorHandler } from '@luxury-store/common';
import { NotFoundError } from '@luxury-store/common';
import { currentUser } from '@luxury-store/common';

// import { redis } from './rate-limiter/redis-client';
import {
  requestRateLimiter,
  productUploadRateLimiter,
} from './rate-limiter/keys';

import { createProductRouter } from './routes/product/create';
import { updateProductRouter } from './routes/product/update';
import { getProductRouter } from './routes/product/read';
import { indexProductRouter } from './routes/product';
import { deleteProductRouter } from './routes/product/delete';
import { createCommentRouter } from './routes/comment/create';
import { updateCommentRouter } from './routes/comment/update';
import { deleteCommentRouter } from './routes/comment/delete';
import { allCommentsRouter } from './routes/comment/read';
import { createWishlistRouter } from './routes/wishlist/create';
import { getWishlistRouter } from './routes/wishlist/read';
import { deleteWishlistRouter } from './routes/wishlist/delete';
import { imageUploadRouter } from './routes/upload';

console.log('enter');
const app = express();

// app.use(async function (req, res, next) {
//   const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//   if (!ip) {
//     throw new Error();
//   }
//   if (typeof ip === 'string') {
//     const requests = await redis.incr(requestRateLimiter(ip));
//     if (requests === 1) {
//       await redis.expire(requestRateLimiter(ip), 60);
//     } else if (requests > 15) {
//       throw new Error();
//     }
//   }

//   next();
// });

app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUser);

app.use(createProductRouter);
app.use(updateProductRouter);
app.use(getProductRouter);
app.use(indexProductRouter);
app.use(deleteProductRouter);

app.use(allCommentsRouter);
app.use(createCommentRouter);
app.use(updateCommentRouter);
app.use(deleteCommentRouter);

app.use(createWishlistRouter);
app.use(deleteWishlistRouter);

app.use(getWishlistRouter);
app.use(imageUploadRouter);

app.all('*', () => {
  throw new NotFoundError('Route does not exist');
});

app.use(errorHandler);

export { app };
