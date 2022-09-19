import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { SigninType } from '../models/user';

import { User } from '../models/user';
import { validateRequest } from '@luxury-store/common';
import { BadRequestError } from '@luxury-store/common';

const router = express.Router();

router.post(
  '/api/auth/signup',
  body('email').trim().isEmail().withMessage('enter valid email'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage(
      'password must be atleast six characters containing alphabets and characters'
    ),
  body('name')
    .trim()
    .exists()
    .withMessage('name is required and must contain only alphabets'),
  validateRequest,
  async (req: Request, res: Response) => {
    const existingUser = await User.findOne({ email: req.body.email });
    // if (existingUser && existingUser.type === SigninType.Google) {
    //   res.send({
    //     message:
    //       'you are previously logged in with google, type a password to login',
    //   });
    // }

    if (existingUser) {
      throw new BadRequestError('email exists, try signing in');
    }

    const user = User.build(req.body);
    user.set({ type: SigninType.EmailAndPassword });
    await user.save();
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      'asdf'
    );

    req.session = {
      jwt: token,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
