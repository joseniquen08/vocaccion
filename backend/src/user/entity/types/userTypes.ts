import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  username: string;
  age: number;
  email: string;
  password: string;
  image: string;
  role: string;
  provider: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface IAccount {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  provider: string;
  type: string;
}

export type UpdateUser = {
  input: Omit<IUser, '_id' | 'name' | 'username' | 'password' | 'image' | 'role' | 'provider' | 'emailVerified' | 'createdAt' | 'updatedAt'>
}

export type UpdateUserWhitoutProvider = {
  input: Omit<IUser, '_id' | 'password' | 'image' | 'role' | 'provider' | 'emailVerified' | 'createdAt' | 'updatedAt'>
}
