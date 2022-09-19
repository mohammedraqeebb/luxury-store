import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';

import { Product } from '../../models/product';
import {
  requireAuth,
  Gender,
  validateRequest,
  BadRequestError,
  NotFoundError,
  ProductStatus,
  NotAuthorizedError,
} from '@luxury-store/common';
import { ProductUpdatedPublisher } from '../../events/publishers/product-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';

const router = express.Router();

router.put(
  '/api/products/:productId',
  requireAuth,
  [
    body('name').exists().trim().withMessage('name required'),
    body('originalPrice')
      .exists()
      .trim()
      .isNumeric()
      .withMessage('Enter a number'),
    body('price').exists().trim().isNumeric().withMessage('Enter a number'),
    body('gender')
      .exists()
      .isIn([Gender.FEMALE, Gender.MALE, Gender.UNISEX])
      .withMessage('enter valid gender value'),
    body('description').exists().trim().withMessage('enter description'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const productId = req.params.productId;

    if (
      typeof productId === 'string' &&
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      throw new BadRequestError('enter valid productId');
    }
    const existingProduct = await Product.findById(productId);
    console.log(existingProduct);

    if (!existingProduct) {
      throw new NotFoundError('product not found');
    }

    if (existingProduct.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (
      existingProduct.status === ProductStatus.RESERVED ||
      existingProduct.status === ProductStatus.SOLD
    ) {
      throw new BadRequestError('product is reserved');
    }

    existingProduct.set(req.body);
    await existingProduct.save();

    await new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: existingProduct._id,
      name: existingProduct.name,
      price: existingProduct.price,
      originalPrice: existingProduct.originalPrice,
      description: existingProduct.description,
      images: existingProduct.images,
      gender: existingProduct.gender,
      status: existingProduct.status,
      version: existingProduct.version,
      category: existingProduct.category,
      brand: existingProduct.brand,
    });

    res.status(200).send({ product: existingProduct });
  }
);

export { router as updateProductRouter };
