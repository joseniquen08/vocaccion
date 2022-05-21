import { IUser } from '../../../user/entity/types/userTypes';

export type CreateUser = {
  userRequest: Omit<IUser, '_id' | 'image' | 'created_at' | 'updated_at'>
}

export type Login = {
  loginRequest: Omit<IUser, '_id' | 'name' | 'role' | 'image' | 'created_at' | 'updated_at'>
}
