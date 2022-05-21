import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};
