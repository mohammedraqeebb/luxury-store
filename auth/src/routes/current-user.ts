import express, { Request, Response } from 'express';
import { currentUser } from '@luxury-store/common';

const router = express.Router();

router.get(
  '/api/auth/currentuser',
  currentUser,
  (req: Request, res: Response) => {
    const currentUser = req.currentUser || null;
    res.send({ currentUser });
  }
);

export { router as currentUserRouter };
