import { start } from './app';
import cloudinaryConfig from './config/cloudinary.config';
import mongooseConfig from './config/mongoose.config';

cloudinaryConfig();

mongooseConfig(`${process.env.MONGO_URI}`);

start();
