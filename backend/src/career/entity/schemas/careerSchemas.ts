import { Schema } from "mongoose";
import { ICareer } from '../types/careerTypes';

export const CareerSchema = new Schema<ICareer>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  faculty: {
    type: String,
    required: true,
  },
  idUniversity: {
    type: String,
    required: true,
  },
  imageUniversity: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  lastUpdate: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
