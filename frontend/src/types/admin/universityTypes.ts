import { CommentUniversityAdminType, CommentUniversityType } from './commentTypes';

export type UniversityType = {
  id: string;
  name: string;
  idReferencesRegion: string[];
  idReferencesProvince: string[];
  type: string;
  license: string;
  campuses:number;
  image: string;
}

export type GetAllUniversitiesSelectType = {
  getAllUniversities: (Omit<UniversityType, 'id'> & { '_id': string })[];
}

export type GetAllUniversitiesType = {
  getAllUniversities: {
    _id: string;
    name: string;
    regions: {
      idReference: string;
      name: string;
    }[];
    provinces: {
      idReference: string;
      name: string;
      idReferenceRegion: string;
    }[];
    type: string;
    license: string;
    campuses:number;
    image: string;
  }[];
}

export type GetAllCommentsUniversityType = {
  getAllCommentsUniversity: CommentUniversityAdminType[];
}

export type GetUniversitiesByTypeType = {
  getUniversitiesByType: GetAllUniversitiesType["getAllUniversities"]
}

export type GetUniversityByIdType ={
  getUniversityById: {
    _id: string;
    name: string;
    regions: {
      id: string;
      idReference: string;
      name: string;
    }[];
    provinces: {
      id: string;
      idReference: string;
      name: string;
      idReferenceRegion: string;
    }[];
    type: string;
    license: string;
    campuses:number;
    image: string;
    comments: CommentUniversityType[];
    errors: {
      message: string;
    }
  };
}

/* */

export type CreateUniversityInput = {
  name: string;
  idReferencesRegion: string[];
  idReferencesProvince: string[];
  type: string;
  license: string;
  campuses: number;
  image: string;
}

export type GetUniversitiesByTypeInput = {
  type: string;
}

export type UniversityOutput = {
  _id: string;
  name: string;
  // regions: [Region]
  // provinces: [Province]
  type: string;
  license: string;
  campuses: number;
  image: string;
}

export type GetUniversityByIdOutput = {
  _id: string;
  name: string;
  // regions: [Region]
  // provinces: [Province]
  type: string;
  license: string;
  campuses: number;
  image: string;
  // comments: [CommentUniversityOutput]
  errors: Error
}