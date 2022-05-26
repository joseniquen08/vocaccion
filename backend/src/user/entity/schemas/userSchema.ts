import { Schema } from 'mongoose';
import { IAccount, IUser } from '../types/userTypes';

export const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    default: function () {
      return this.email.split('@')[0];
    }
  },
  age: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'super'],
  },
  image: {
    type: String,
    default: '',
  },
  provider: {
    type: String,
    default: 'no',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const AccountSchema = new Schema<IAccount>({
  userId: Schema.Types.ObjectId,
  provider: String,
  type: String,
});
