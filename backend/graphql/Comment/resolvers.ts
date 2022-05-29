import { CareerModel } from '../../src/career/entity/models/careerModel';
import { ICareer } from '../../src/career/entity/types/careerTypes';
import { CommentCareerModel, CommentUniversityModel } from '../../src/comment/entity/models/commentModels';
import { CreateCommentCareer, CreateCommentUniversity, ICommentCareer, ICommentUniversity } from '../../src/comment/entity/types/commentTypes';
import { UniversityModel } from '../../src/university/entity/models/universityModel';
import { IUniversity } from '../../src/university/entity/types/universityTypes';
import { UserModel } from '../../src/user/entity/models/userModel';
import { IUser } from '../../src/user/entity/types/userTypes';

const queries = {
  getAllComments: async () => {
    try {
      const commentsCareer = await CommentCareerModel.find({});
      const commentsCareerResponse = await Promise.all(commentsCareer.map(async (comment: ICommentCareer) => {
        const { _id, content, idUser, idCareer, createdAt, updatedAt } = comment;
        const user: IUser | null = await UserModel.findById(idUser);
        if (!user) throw new Error('user not found');
        const career: ICareer | null = await CareerModel.findById(idCareer);
        if (!career) throw new Error('career not found');
        return {
          id: _id,
          content,
          createdAt,
          updatedAt,
          user,
          page: {
            id: career._id,
            name: career.name,
            image: career.imageUniversity,
          }
        };
      }));
      const commentsUniversity = await CommentUniversityModel.find({});
      const commentsUniversityResponse = await Promise.all(commentsUniversity.map(async (comment: ICommentUniversity) => {
        const { _id, content, idUser, idUniversity, createdAt, updatedAt } = comment;
        const user: IUser | null = await UserModel.findById(idUser);
        if (!user) throw new Error('user not found');
        const university: IUniversity | null = await UniversityModel.findById(idUniversity);
        if (!university) throw new Error('university not found');
        return {
          id: _id,
          content,
          createdAt,
          updatedAt,
          user,
          page: {
            id: university._id,
            name: university.name,
            image: university.image,
          }
        };
      }));
      return [...commentsCareerResponse, ...commentsUniversityResponse];
    } catch (error: any) {
      return {
        errors: { message: error.message }
      }
    }
  }
};

const mutations = {
  createCommentCareer: async (_: any, { input }: CreateCommentCareer) => {
    const commentCareer = new CommentCareerModel(input);
    const newCommentCareer: ICommentCareer = await commentCareer.save();
    return newCommentCareer;
  },
  createCommentUniversity: async (_: any, { input }: CreateCommentUniversity) => {
    const commentUniversity = new CommentUniversityModel(input);
    const newCommentUniversity: ICommentUniversity = await commentUniversity.save();
    return newCommentUniversity;
  }
};

export const resolvers = { queries, mutations };
