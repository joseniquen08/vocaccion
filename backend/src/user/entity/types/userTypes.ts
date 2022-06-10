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
  emailVerifiedV: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateUser = {
  input: Omit<IUser, '_id' | 'name' | 'username' | 'password' | 'image' | 'role' | 'provider' | 'emailVerifiedV' | 'createdAt' | 'updatedAt'>
}

export type UpdateUserWhitoutProvider = {
  input: Omit<IUser, '_id' | 'password' | 'image' | 'role' | 'provider' | 'emailVerifiedV' | 'createdAt' | 'updatedAt'>
}

export type UpdateImageUser = {
  input: Omit<IUser, '_id' | 'name' | 'username' | 'age' | 'password' | 'role' | 'provider' | 'emailVerifiedV' | 'createdAt' | 'updatedAt'>
}
