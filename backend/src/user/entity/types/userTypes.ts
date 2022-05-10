import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateUser = {
  userRequest: Omit<IUser, '_id' | 'created_at' | 'updated_at'>
}
