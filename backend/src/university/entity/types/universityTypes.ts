import { Types } from "mongoose";

export interface IUniversity {
  _id: Types.ObjectId;
  name: string;
  idReferencesRegion: string[];
  idReferencesProvince: string[];
  type: string;
  license: string;
  campuses: number;
  image: string;
};

export type CreateUniversity = {
  input: Omit<IUniversity, '_id'>
}
