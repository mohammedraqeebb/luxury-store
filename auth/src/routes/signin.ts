import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError } from '@luxury-store/common';
import { SigninType, User } from '../models/user';
import { PasswordManager } from '../services/password-manager';

const router = express.Router();

router.post(
  '/api/auth/signin',
  body('email').trim().isEmail().withMessage('enter valid email'),
  body('password')
    .trim()
    .isAlphanumeric()
    .withMessage('password cannot be empty')
    .isLength({ min: 6 })
    .withMessage(
      'password must be atleast six characters containing alphabets and characters'
    ),
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(req.body);
    const { email, password, type } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError(
        'email does not exist or password is incorrect'
      );
    }
    // if (existingUser && existingUser.type === SigninType.Google) {
    //   existingUser.set({ password });
    //   await existingUser.save();
    // }

    const checkPassword = PasswordManager.comparePassword(
      password,
      existingUser.password
    );

    if (!checkPassword) {
      throw new BadRequestError(
        'email does not exist or password is incorrect'
      );
    }
    if (type === SigninType.Google) {
      existingUser.set({ type: SigninType.Both });
      await existingUser.save();
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      },
      'asdf'
    );

    req.session = {
      jwt: token,
    };
    res.send({ user: existingUser });
  }
);

export { router as signinRouter };
