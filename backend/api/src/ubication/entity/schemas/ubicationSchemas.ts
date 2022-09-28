import { Schema } from "mongoose";
import { IProvince, IRegion } from '../types/ubicationTypes';

export const RegionSchema = new Schema<IRegion>({
  idReference: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const ProvinceSchema = new Schema<IProvince>({
  idReference: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  idReferenceRegion: {
    type: String,
    required: true,
  },
});
