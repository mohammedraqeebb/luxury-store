import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import mongoose from 'mongoose';
import { Gender, ProductStatus, Brand, Category } from '@luxury-store/common';

interface ProductAttrs {
  id: string;
  userId: string;
  name: string;
  price: number;
  originalPrice: number;
  gender: Gender;
  description: string;
  images: string[];
  category: Category;
  brand: Brand;
}
export interface ProductDoc extends mongoose.Document {
  userId: string;
  name: string;
  originalPrice: number;
  price: number;
  gender: Gender;
  description: string;
  images: string[];
  version: number;
  category: Category;
  brand: Brand;
  cannotBePurchased(): boolean;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  findBySequence(event: {
    id: string;
    version: number;
  }): Promise<ProductDoc | null>;
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    brand: {
      type: String,
      enum: Object.values(Brand),
    },
    category: {
      type: String,
      enum: Object.values(Category),
    },
    status: {
      type: String,
      default: ProductStatus.AVAILABLE,
      enum: Object.values(ProductStatus),
    },
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
productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product({
    _id: attrs.id,
    ...attrs,
  });
};

productSchema.statics.findBySequence = (event: {
  id: string;
  version: number;
}) => {
  return Product.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

productSchema.methods.cannotBePurchased = function () {
  console.log('hit');
  return (
    this.status === ProductStatus.RESERVED ||
    this.status === ProductStatus.HOLD ||
    this.status === ProductStatus.SOLD
  );
};
productSchema.set('versionKey', 'version');
productSchema.plugin(updateIfCurrentPlugin);

const Product = mongoose.model<ProductDoc, ProductModel>(
  'Product',
  productSchema
);

export { Product };
