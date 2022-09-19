import mongoose from 'mongoose';
import { ProductDoc } from './product';

interface WishlistAttrs {
  userId: string;
  productId?: string;
}

interface WishlistDoc extends mongoose.Document {
  products: ProductDoc[];
}

interface WishlistModel extends mongoose.Model<WishlistDoc> {
  build(attrs: WishlistAttrs): WishlistDoc;
}

const wishlistSchema = new mongoose.Schema(
  {
    products: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Product', unique: true },
    ],
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

wishlistSchema.statics.build = (attrs: WishlistAttrs) => {
  return new Wishlist({
    _id: attrs.userId,
    products: [],
  });
};

wishlistSchema.set('versionKey', 'version');

const Wishlist = mongoose.model<WishlistDoc, WishlistModel>(
  'Wishlist',
  wishlistSchema
);

export { Wishlist };
