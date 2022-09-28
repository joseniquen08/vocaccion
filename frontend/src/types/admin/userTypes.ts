import { UserType } from '../auth/index';

export type GetAllUsersType = {
  getAllUsers: UserType[];
}

export type GetUserById = {
  getUserById: UserType;
}
