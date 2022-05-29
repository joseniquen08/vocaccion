import { Types } from "mongoose";

export interface ICommentCareer {
  _id: Types.ObjectId;
  idUser: string;
  idCareer: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentUniversity {
  _id: Types.ObjectId;
  idUser: string;
  idUniversity: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCommentCareer = {
  input: Omit<ICommentCareer, '_id' | 'createdAt' | 'updatedAt'>
}

export type CreateCommentUniversity = {
  input: Omit<ICommentUniversity, '_id' | 'createdAt' | 'updatedAt'>
}
