import { Types } from "mongoose";

export interface IRegion {
  _id: Types.ObjectId;
  idReference: string;
  name: string;
}

export interface IProvince {
  _id: Types.ObjectId;
  idReference: string;
  name: string;
  idReferenceRegion: string;
}

export type CreateRegion = {
  input: Omit<IRegion, '_id'>
}

export type CreateProvince = {
  input: Omit<IProvince, '_id'>
}
