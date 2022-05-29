import { Schema } from "mongoose";
import { ICommentCareer, ICommentUniversity } from '../types/commentTypes';

export const CommentCareerSchema = new Schema<ICommentCareer>({
  idUser: {
    type: String,
    required: true,
  },
  idCareer: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const CommentUniversitySchema = new Schema<ICommentUniversity>({
  idUser: {
    type: String,
    required: true,
  },
  idUniversity: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
