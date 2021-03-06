import { Schema } from 'mongoose';
import { IUser } from '../types/userTypes';

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
  emailVerifiedV: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

UserSchema.post('save', function (error: any, doc: any, next: any) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('duplicate key'));
  } else {
    next();
  }
});
