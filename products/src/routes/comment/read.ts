import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';

import { ProductComments } from '../../models/product-comments';

import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@luxury-store/common';
import { Product } from '../../models/product';

const router = express.Router();

router.get(
  '/api/products/:productId/comments',
  async (req: Request, res: Response) => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new BadRequestError('valid productid is required');
    }
    const productComments = await ProductComments.findById(productId).populate(
      'comments'
    );
    if (!productComments) {
      return res.status(201).send({ comments: null });
    }

    res.status(201).send({ comments: productComments.comments });
  }
);

export { router as allCommentsRouter };
