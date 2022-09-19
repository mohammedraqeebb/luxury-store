import mongoose from 'mongoose';
import { Gender, ProductStatus, Category, Brand } from '@luxury-store/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ProductAttrs {
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
  status: ProductStatus;
  category: Category;
  brand: Brand;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
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
      required: true,
      trim: true,
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
    },
    description: {
      type: String,
      required: true,
      max: 500,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(Category),
    },
    brand: {
      type: String,
      enum: Object.values(Brand),
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
productSchema.set('versionKey', 'version');
productSchema.plugin(updateIfCurrentPlugin);
productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  'Product',
  productSchema
);

export { Product };
