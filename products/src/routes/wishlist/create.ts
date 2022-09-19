import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';

import {
  BadRequestError,
  requireAuth,
  validateRequest,
} from '@luxury-store/common';
import { Wishlist } from '../../models/wishlist';
const router = express.Router();

router.post(
  '/api/products/wishlist/create',
  requireAuth,
  body('productId')
    .exists()
    .custom((productId) => mongoose.Types.ObjectId.isValid(productId))
    .withMessage('enter valid productId'),
  validateRequest,
  async (req: Request, res: Response) => {
    const wishlist = await Wishlist.findById(req.currentUser!.id);

    if (!wishlist) {
      const wishlist = Wishlist.build({
        userId: req.currentUser!.id,
      });
      wishlist.products.push(req.body.productId);
      await wishlist.save();
      return res.send(201).send({ wishlist });
    }

    for (const product of wishlist.products) {
      if (product.toString() === req.body.productId) {
        throw new BadRequestError('product already added in wishlist');
      }
    }

    wishlist.products.push(req.body.productId);
    await wishlist.save();
    res.status(201).send({ wishlistProducts: wishlist });
  }
);

export { router as createWishlistRouter };
