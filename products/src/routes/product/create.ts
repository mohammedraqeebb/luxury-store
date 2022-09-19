import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';

import { Product } from '../../models/product';
import { requireAuth, Gender, validateRequest } from '@luxury-store/common';
import { natsWrapper } from '../../nats-wrapper';
import { ProductCreatedPublisher } from '../../events/publishers/product-created-publisher';

const router = express.Router();

router.post(
  '/api/products/create',
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
    body('description').exists().trim(),
    body('brand').exists().withMessage('brand is required'),
    body('category').exists().withMessage('category is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const product = Product.build({ ...req.body, userId: req.currentUser!.id });
    await product.save();
    console.log('userId', product.userId);

    await new ProductCreatedPublisher(natsWrapper.client).publish({
      id: product._id,
      userId: product.userId,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      description: product.description,
      images: product.images,
      gender: product.gender,
      status: product.status,
      category: product.category,
      brand: product.brand,
    });
    res.status(201).send({ product });
  }
);

export { router as createProductRouter };
