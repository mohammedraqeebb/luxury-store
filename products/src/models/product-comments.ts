import mongoose from 'mongoose';
import { CommentDoc } from './comment';

interface ProductCommentsAttrs {
  id: string;
  comment: CommentDoc;
}
interface ProductCommentsDoc extends mongoose.Document {
  comments: CommentDoc[];
}
interface ProductCommentsModel extends mongoose.Model<ProductCommentsDoc> {
  build(attrs: ProductCommentsAttrs): ProductCommentsDoc;
}

const productCommentsSchema = new mongoose.Schema(
  {
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

productCommentsSchema.statics.build = (attrs: ProductCommentsAttrs) => {
  return new ProductComments({
    _id: attrs.id,
    ...attrs,
  });
};

const ProductComments = mongoose.model<
  ProductCommentsDoc,
  ProductCommentsModel
>('ProductComments', productCommentsSchema);

export { ProductComments };
