import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import { Product } from '../../models/product';
import { Comment } from '../../models/comment';
import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from '@luxury-store/common';

const router = express.Router();

router.post(
  '/api/products/:productId/comments/:commentId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { productId, commentId } = req.params;
    console.log('delete comment router hit');

    if (
      !mongoose.Types.ObjectId.isValid(productId) &&
      !mongoose.Types.ObjectId.isValid(commentId)
    ) {
      throw new BadRequestError('valid productid is required');
    }
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      throw new NotFoundError('product not found');
    }
    const existingComment = await Comment.findById(commentId);

    if (!existingComment) {
      throw new NotFoundError('comment not found');
    }

    if (req.currentUser?.id === existingComment.commentorId.toString()) {
      await existingComment.delete();
      return res.status(200).send({ message: 'comment deleted' });
    } else if (req.currentUser?.id === existingProduct.userId) {
      existingComment.set('reply', undefined);
      await existingComment.save();
      return res.status(204).send({ message: 'user deleted' });
    }

    throw new NotAuthorizedError();
  }
);

export { router as deleteCommentRouter };
