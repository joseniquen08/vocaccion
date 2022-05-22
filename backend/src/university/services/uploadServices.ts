import cloudinary from 'cloudinary';
import { Request } from 'express';
import multer, { FileFilterCallback, MulterError } from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images');
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1];
    callback(null, `${Date.now()}.${ext}`);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(null, false);
    callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'));
  }
}

export const uploadOnDisk = multer({
  storage,
  fileFilter,
}).single('image');

export const cloudinaryService = async (path: string) => {
  try {
    return await cloudinary.v2.uploader.upload(path);
  } catch (error: any) {
    throw new Error(error);
  }
}
