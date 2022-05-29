import { model } from 'mongoose';
import { CommentCareerSchema, CommentUniversitySchema } from '../schemas/commentSchemas';
import { ICommentCareer, ICommentUniversity } from '../types/commentTypes';

export const CommentCareerModel = model<ICommentCareer>('CommentCareer', CommentCareerSchema);
export const CommentUniversityModel = model<ICommentUniversity>('CommentUniversity', CommentUniversitySchema);
