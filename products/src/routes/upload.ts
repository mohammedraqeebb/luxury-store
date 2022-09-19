import dotenv from 'dotenv';
dotenv.config();
import multer from 'multer';
import express, { Request, Response } from 'express';
const router = express.Router();

import crypto from 'crypto';
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes);
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const region = 'us-west-2';
const bucketName = 'bucket-for-images-storages';
const accessKeyId = 'AKIAQ4EXFCI2VSNIFBX6';
const secretAccessKey = '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';
// console.log('access', accessKeyId, 'secret', secretAccessKey);
// console.log('env', process.env);
export const s3 = new S3Client({
  credentials: {
    accessKeyId,

    secretAccessKey,
  },
  region,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
upload.single('image');

router.post(
  '/api/products/imageupload',
  upload.single('image'),
  async (req: Request, res: Response) => {
    // console.log('image route hit', req.file);
    const params = {
      Bucket: 'bucket-for-images-storages',
      Key: req.file!.originalname,
      Body: req.file!.buffer,
      Content: req.file!.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
  }
);

export { router as imageUploadRouter };
