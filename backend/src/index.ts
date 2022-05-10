import { start } from './app';
import mongooseConfig from './config/mongoose.config';

mongooseConfig(`${process.env.MONGO_URI}`);

start();
