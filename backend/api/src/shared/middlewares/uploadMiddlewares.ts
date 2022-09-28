import { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import { ApplicationError } from '../ApplicationError';
import { uploadOnDisk } from '../services/uploadServices';

export const uploadImageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  uploadOnDisk(req, res, function (error: any) {
    if (error instanceof MulterError) {
      next(new ApplicationError(400, 'not image file'));
    } else if (error) {
      next(new ApplicationError(400, `${error.message}`));
    }
    next();
  })
}
