import { natsWrapper } from './../../nats-wrapper';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ProductComments } from '../../models/product-comments';
import { Product } from '../../models/product';
import {
  requireAuth,
  BadRequestError,
  NotAuthorizedError,
  ProductStatus,
} from '@luxury-store/common';
import { ProductDeletedPublisher } from '../../events/publishers/product-deleted-publisher';

const router = express.Router();

router.post(
  '/api/products/:productId/delete',
  requireAuth,
  async (req: Request, res: Response) => {
    console.log('delete product router hit');
    const productId = req.params.productId;
    if (
      typeof productId === 'string' &&
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      throw new BadRequestError('enter valid productId');
    }
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      throw new BadRequestError('product does not exist');
    }

    if (req.currentUser!.id !== existingProduct.userId.toString()) {
      throw new NotAuthorizedError();
    }
    if (existingProduct.status === ProductStatus.RESERVED) {
      throw new BadRequestError('the product is reserved');
    }
    if (existingProduct.status === ProductStatus.SOLD) {
      throw new BadRequestError('cannot delete a sold product');
    }

    await Product.findByIdAndDelete(existingProduct._id);
    const productComments = await ProductComments.findById(existingProduct._id);
    if (productComments) {
      await ProductComments.findByIdAndDelete(existingProduct._id);
    }

    new ProductDeletedPublisher(natsWrapper.client).publish({
      id: existingProduct._id,
      version: existingProduct.version,
    });

    res.status(200).send({ message: 'deleted product' });
  }
);

export { router as deleteProductRouter };
