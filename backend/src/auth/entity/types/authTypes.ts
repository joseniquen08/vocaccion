import { IUser } from '../../../user/entity/types/userTypes';

export type CreateUser = {
  userRequest: Omit<IUser, '_id' | 'created_at' | 'updated_at'>
}

export type Login = {
  loginRequest: Omit<IUser, '_id' | 'firstName' | 'lastName' | 'created_at' | 'updated_at'>
}
