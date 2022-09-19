import mongoose from 'mongoose';

interface CommentAttrs {
  productId: string;
  comment: string;
  commentorId: string;
  commentorName: string;
}

export interface CommentDoc extends mongoose.Document {
  productId: string;
  comment: string;
  reply: string;
  commentorId: string;
  commentorName: string;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

const commentSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      max: 200,
      trim: true,
    },
    commentorId: {
      type: String,
      required: true,
    },
    commentorName: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
      max: 200,
      trim: true,
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

commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  'Comment',
  commentSchema
);

export { Comment };
