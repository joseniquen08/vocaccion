import { NextFunction, Request, Response } from 'express';
import fs from 'fs-extra';
import { ApplicationError } from '../ApplicationError';
import { cloudinaryService } from '../services/uploadServices';

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = await cloudinaryService(req.file!.path);
    if (!url) throw new Error('url not found');
    await fs.remove(req.file!.path);
    res.status(201).send({ url });
  } catch (error: any) {
    next(new ApplicationError(401, `${error.message}`));
  }
}