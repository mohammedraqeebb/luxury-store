import mongoose from 'mongoose';
import { PasswordManager } from './../services/password-manager';

export enum SigninType {
  Google = 'googlesignin',
  Both = 'both',
  EmailAndPassword = 'emailandpassword',
}

interface UserAttrs {
  name: string;
  email: string;
  password: string;
  type: SigninType;
}

interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  isBanned: boolean;
  type: SigninType;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      password: true,
      required: true,
      min: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: Object.values(SigninType),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.isVerified;
        delete ret.__v;
        delete ret.isBanned;
      },
    },
  }
);

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await PasswordManager.hashPassword(this.password);
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
