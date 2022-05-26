import { model } from "mongoose";
import { AccountSchema, UserSchema } from '../schemas/userSchema';
import { IAccount, IUser } from '../types/userTypes';

export const UserModel = model<IUser>('User', UserSchema);
export const AccountModel = model<IAccount>('Account', AccountSchema);
