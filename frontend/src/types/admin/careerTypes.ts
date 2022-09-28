import { CommentCareerAdminType, CommentCareerType } from './commentTypes';

export type CareerType = {
  id: string;
  name: string;
  type: string;
  description: string;
  faculty: string;
  idUniversity: string;
  imageUniversity: string;
  duration: number;
  lastUpdate: string;
}

export type GetAllCareersType = {
  getAllCareers: (CareerType & { nameUniversity: string })[];
}

export type GetAllCommentsCareerType = {
  getAllCommentsCareer: CommentCareerAdminType[];
}

export type GetCareersByTypeType = {
  getCareersByType: (CareerType & { nameUniversity: string })[]
}

export type GetCareerByIdType = {
  getCareerById: CareerType & {
    nameUniversity: string;
    comments: CommentCareerType[];
    errors: {
      message: string;
    }
  }
}

/* */

export type CreateCareerInput = {
  name: string;
  type: string;
  description: string;
  faculty: string;
  idUniversity: string;
  imageUniversity: string;
  duration: number;
  lastUpdate: string;
}

export type CreateCareerOutput = {
  id: string;
  name: string;
  type: string;
  description: string;
  faculty: string;
  idUniversity: string;
  nameUniversity: string;
  imageUniversity: string;
  duration: number;
  lastUpdate: string;
}
