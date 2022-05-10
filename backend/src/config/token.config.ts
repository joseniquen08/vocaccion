import dotenv from 'dotenv';

dotenv.config();

const tokenConfig = {
  secret: `${process.env.TOKEN_SECRET}`,
  expires: `${process.env.TOKEN_EXPIRES}`,
  refresh_secret: `${process.env.TOKEN_REFRESH_SECRET}`,
  refresh_expires: `${process.env.TOKEN_REFRESH_EXPIRES}`,
}

export default tokenConfig;
