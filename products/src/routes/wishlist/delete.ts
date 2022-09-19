import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';

import {
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@luxury-store/common';
import { Wishlist } from '../../models/wishlist';
const router = express.Router();

router.post(
  '/api/products/wishlist/product/delete',
  requireAuth,
  body('productId')
    .exists()
    .custom((productId) => mongoose.Types.ObjectId.isValid(productId))
    .withMessage('enter valid productId'),
  validateRequest,
  async (req: Request, res: Response) => {
    console.log('router hit wishlist');
    const wishlist = await Wishlist.findById(req.currentUser!.id);
    if (!wishlist) {
      throw new NotFoundError('wishlist not found');
    }
    const wishlistProducts = wishlist.products;

    const filteredWishlistProducts = wishlistProducts.filter(
      (wishlistProductId) => wishlistProductId.toString() !== req.body.productId
    );

    wishlist.products = filteredWishlistProducts;
    await wishlist.save();
    return res.status(200).send({ wishlist });
  }
);

export { router as deleteWishlistRouter };
