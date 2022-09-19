import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';

import { Comment } from '../../models/comment';
import { ProductComments } from '../../models/product-comments';

import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@luxury-store/common';
import { Product } from '../../models/product';

const router = express.Router();

router.post(
  '/api/products/:productId/comments/create',
  requireAuth,
  [body('comment').exists().notEmpty().withMessage('comment required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { comment: userComment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new BadRequestError('valid productid is required');
    }
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      throw new NotFoundError('product not found');
    }
    const comment = Comment.build({
      productId,
      comment: userComment,
      commentorId: req.currentUser!.id,
      commentorName: req.currentUser!.name,
    });
    await comment.save();

    let productComments = await ProductComments.findById(productId);
    if (!productComments) {
      //@ts-ignore
      productComments = ProductComments.build({ id: productId, comment });
    }
    if (productComments) {
      productComments.comments.push(comment._id);
      await productComments.save();
    }

    res.status(201).send({ comment });
  }
);

export { router as createCommentRouter };
