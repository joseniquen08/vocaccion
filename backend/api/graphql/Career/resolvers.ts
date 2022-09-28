import { CareerModel } from '../../src/career/entity/models/careerModel';
import { CreateCareer, ICareer } from '../../src/career/entity/types/careerTypes';
import { CommentCareerModel } from '../../src/comment/entity/models/commentModels';
import { ICommentCareer } from '../../src/comment/entity/types/commentTypes';
import { UniversityModel } from '../../src/university/entity/models/universityModel';
import { IUniversity } from '../../src/university/entity/types/universityTypes';
import { UserModel } from '../../src/user/entity/models/userModel';
import { IUser } from '../../src/user/entity/types/userTypes';

const queries = {
  getAllCareers: async () => {
    const careers: ICareer[] = await CareerModel.find({});
    const careerResponse = await Promise.all(careers.map(async (career) => {
      const { _id, name, type, description, faculty, idUniversity, imageUniversity, duration, lastUpdate } = career;
      const university: IUniversity | null = await UniversityModel.findById(idUniversity);
      if (!university) throw new Error('university not found');
      return {
        id: _id,
        name,
        type,
        description,
        faculty,
        idUniversity,
        imageUniversity,
        duration,
        lastUpdate,
        nameUniversity: university.name,
      }
    }));
    return careerResponse;
  },
  getCareersByType: async (_: any, { input }: { input: { type: string } }) => {
    const { type } = input;
    const careers: ICareer[] = await CareerModel.find({ type });
    const careerResponse = await Promise.all(careers.map(async (career) => {
      const { _id, name, type, description, faculty, idUniversity, imageUniversity, duration, lastUpdate } = career;
      const university: IUniversity | null = await UniversityModel.findById(idUniversity);
      if (!university) throw new Error('university not found');
      return {
        id: _id,
        name,
        type,
        description,
        faculty,
        idUniversity,
        imageUniversity,
        duration,
        lastUpdate,
        nameUniversity: university.name,
      }
    }));
    return careerResponse;
  },
  getCareerById: async (_: any, { id }: { id: string }) => {
    try {
      const career: ICareer | null = await CareerModel.findById(id);
      if (!career) throw new Error('career not found');
      const { _id, name, type, description, faculty, idUniversity, imageUniversity, duration, lastUpdate } = career;
      const university: IUniversity | null = await UniversityModel.findById(idUniversity);
      if (!university) throw new Error('university not found');
      const comments: ICommentCareer[] = await CommentCareerModel.find({ idCareer: _id });
      const commentsResponse = await Promise.all(comments.map(async (comment: ICommentCareer) => {
        const { _id, idCareer, idUser, content, createdAt, updatedAt } = comment;
        const user: IUser | null = await UserModel.findById(idUser);
        if (!user) throw new Error('user not found');
        return {
          id: _id,
          idCareer,
          idUser,
          content,
          createdAt,
          updatedAt,
          nameUser: user.name,
          imageUser: user.image,
        };
      }));
      return {
        id: _id,
        name,
        type,
        description,
        faculty,
        idUniversity,
        nameUniversity: university.name,
        imageUniversity,
        duration,
        lastUpdate,
        comments: commentsResponse,
      }
    } catch (error: any) {
      return {
        errors: { message: error.message }
      }
    }
  }
};
const mutations = {
  createCareer: async (_: any, { input }: CreateCareer) => {
    const { idUniversity } = input;
    const university: IUniversity | null = await UniversityModel.findById(idUniversity);
    if (!university) throw new Error('university not found');
    input.imageUniversity = university.image;
    const career = new CareerModel(input);
    const newCareer: ICareer = await career.save();
    return newCareer;
  },
  deleteCareer: async (_: any, { id }: { id: string }) => {
    const career: ICareer | null = await CareerModel.findByIdAndRemove(id);
    if (!career) throw new Error('career not found');
    return career;
  }
};

export const resolvers = { queries, mutations };
