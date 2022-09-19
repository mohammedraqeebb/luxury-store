import express, { Request, Response } from 'express';

import { NotFoundError } from '@luxury-store/common';
import { Wishlist } from '../../models/wishlist';
const router = express.Router();

router.get(
  '/api/products/wishlist/get',
  async (req: Request, res: Response) => {
    if (!req.currentUser) {
      return res.status(200).send({ wishlistProducts: null });
    }
    let wishlist = await Wishlist.findById(req.currentUser!.id).populate(
      'products'
    );
    if (!wishlist) {
      return res.status(200).send({ wishlistProducts: null });
    }

    return res.status(200).send({ wishlistProducts: wishlist!.products });
  }
);

export { router as getWishlistRouter };
