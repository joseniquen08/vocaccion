import { Types } from 'mongoose';
import { IUser } from '../../../user/entity/types/userTypes';

export interface IPin {
  id: Types.ObjectId;
  pin: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUser = {
  userRequest: Omit<IUser, '_id' | 'image' | 'createdAt' | 'createdAt'>
}

export type Login = {
  loginRequest: Omit<IUser, '_id' | 'name' | 'role' | 'image' | 'createdAt' | 'createdAt'>
}

export type VerifyEmail = {
  verifyRequest: Omit<IPin, '_id' | 'createdAt' | 'createdAt'>
}
