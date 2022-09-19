import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';

import { Comment } from '../../models/comment';
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@luxury-store/common';
import { Product } from '../../models/product';

const router = express.Router();

router.post(
  '/api/products/:productId/comments/:commentId/edit',
  requireAuth,
  [body('comment').exists().notEmpty().withMessage('comment required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log('update comment hit');
    const { productId, commentId } = req.params;
    const { comment: userComment, reply: userReply } = req.body;
    console.log(userComment, userReply);

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

    if (req.currentUser?.id === existingProduct.userId) {
      if (userReply.length === 0) {
        throw new BadRequestError('reply cannot be empty');
      }
      existingComment.set({ reply: userReply });
      await existingComment.save();

      return res.status(200).send({ comment: existingComment });
    } else if (req.currentUser?.id === existingComment.commentorId) {
      if (userComment.length === 0) {
        throw new BadRequestError('comment cannot be empty');
      }
      existingComment.set({ comment: userComment });
      await existingComment.save();

      return res.status(200).send({ comment: existingComment });
    }
    throw new NotAuthorizedError();
  }
);

export { router as updateCommentRouter };
