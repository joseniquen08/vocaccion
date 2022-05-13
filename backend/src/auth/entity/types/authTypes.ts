import { IUser } from '../../../user/entity/types/userTypes';

export type CreateUser = {
  userRequest: Omit<IUser, '_id' | 'created_at' | 'updated_at'>
}
