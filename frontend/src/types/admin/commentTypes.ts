import { UserType } from "@cust-types/auth";

export type CommentCareerType = {
  id: string;
  idUser: string;
  idCareer: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  nameUser: string;
  imageUser: string;
}

export type CommentCareerAdminType = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: Omit<UserType, 'emailVerifiedV'>;
  career: {
    id: string;
    name: string;
    imageUniversity: string;
  }
}

export type CommentUniversityType = {
  id: string;
  idUser: string;
  idUniversity: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  nameUser: string;
  imageUser: string;
}


export type CommentUniversityAdminType = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: Omit<UserType, 'emailVerifiedV'>;
  university: {
    id: string;
    name: string;
    image: string;
  }
}
