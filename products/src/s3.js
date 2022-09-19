// import dotenv from 'dotenv'
// import aws from 'aws-sdk'
// import crypto from 'crypto'
// import { promisify } from "util"
// const randomBytes = promisify(crypto.randomBytes)
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

// dotenv.config()

// const region = "us-west-2"
// const bucketName = "bucket-for-images-storages"
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

// export const s3 = new S3Client({
//   credentials: {

//     accessKeyId,
//     secretAccessKey,
//   },
//   region
// })

// export async function generateUploadURL() {
//   const rawBytes = await randomBytes(16)
//   const imageName = rawBytes.toString('hex')

//   const params = ({
//     Bucket: bucketName,
//     Key: imageName,
//     Expires: 60
//   })

//   const uploadURL = await s3.getSignedUrlPromise('putObject', params)
//   return uploadURL
// }