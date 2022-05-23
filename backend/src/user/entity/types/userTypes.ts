import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  username: string;
  edad: number;
  email: string;
  password: string;
  image: string;
  role: string;
  provider: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};
