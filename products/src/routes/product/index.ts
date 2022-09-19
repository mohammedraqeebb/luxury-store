import express, { Request, Response } from 'express';

import { Product } from '../../models/product';
import { requireAuth } from '@luxury-store/common';
const router = express.Router();

router.get(
  '/api/products/',
  requireAuth,
  async (req: Request, res: Response) => {
    const existingProducts = await Product.find({
      userId: req.currentUser!.id,
    });
    const trimmedProducts = existingProducts.map((product) => {
      const { id, name, images, price, status } = product;
      return { id, name, images, price, status };
    });
    res.status(200).send({ products: trimmedProducts });
  }
);

export { router as indexProductRouter };
