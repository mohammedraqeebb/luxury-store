import express, { Request, Response } from 'express';

import mongoose from 'mongoose';

import { Product } from '../../models/product';
import { BadRequestError, NotFoundError } from '@luxury-store/common';

const router = express.Router();

router.get('/api/products/:productId', async (req: Request, res: Response) => {
  const productId = req.params.productId;
  if (
    typeof productId === 'string' &&
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    throw new BadRequestError('enter valid productId');
  }
  const existingProduct = await Product.findById(productId);
  if (!existingProduct) {
    throw new NotFoundError('product not found');
  }
  res.status(200).send({ product: existingProduct });
});

export { router as getProductRouter };
