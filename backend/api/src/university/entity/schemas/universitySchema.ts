import { Schema } from "mongoose";
import { IUniversity } from '../types/universityTypes';

export const UniversitySchema = new Schema<IUniversity>({
  name: {
    type: String,
    required: true,
  },
  idReferencesRegion: {
    type: [String],
    required: true,
  },
  idReferencesProvince: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  campuses: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
