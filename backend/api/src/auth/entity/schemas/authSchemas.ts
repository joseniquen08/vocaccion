import { Schema } from 'mongoose';
import { IPin } from '../types/authTypes';

export const PinSchema = new Schema<IPin>({
  pin: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  expireAfterSeconds: 7200,
});