import { Schema } from 'mongoose';
import { IUser } from '../types/userTypes';

export const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
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
    required: true,
    default: 'user',
    enum: ['user', 'admin', 'super'],
  },
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});
