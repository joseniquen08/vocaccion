import { Types } from "mongoose";

export interface ICareer {
  _id: Types.ObjectId;
  name: string;
  type: string;
  description: string;
  faculty: string;
  idUniversity: string;
  imageUniversity: string;
  duration: number;
  lastUpdate: string;
};

export type CreateCareer = {
  input: Omit<ICareer, '_id'>
}
