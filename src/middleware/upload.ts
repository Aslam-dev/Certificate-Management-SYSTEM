import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});

export const uploadMiddleware = upload.single('photo');

export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: (req: any, res: any, next: NextHandler) => void) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
