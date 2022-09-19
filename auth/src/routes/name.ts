import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '@luxury-store/common';
import { NotFoundError } from '@luxury-store/common';
import { requireAuth } from '@luxury-store/common';
import { User } from '../models/user';
import { validateRequest } from '@luxury-store/common';
const router = express.Router();

router.post(
  '/api/auth/profile/name',
  body('userId').exists().withMessage('user id is required to be edited'),
  validateRequest,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.body.userId);
    console.log(user);
    if (!user) {
      throw new NotFoundError('user not found');
    }

    res.status(200).send({ name: user.name, email: user.email });
  }
);

export { router as profileNameRouter };
