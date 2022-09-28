import { CommentUniversityModel } from '../../src/comment/entity/models/commentModels';
import { ICommentUniversity } from '../../src/comment/entity/types/commentTypes';
import { ProvinceModel, RegionModel } from '../../src/ubication/entity/models/ubicationModels';
import { UniversityModel } from '../../src/university/entity/models/universityModel';
import { CreateUniversity, IUniversity } from '../../src/university/entity/types/universityTypes';
import { UserModel } from '../../src/user/entity/models/userModel';
import { IUser } from '../../src/user/entity/types/userTypes';

const queries = {
  getAllUniversities: async () => {
    const universities: IUniversity[] = await UniversityModel.find({});
    const universitiesResponse = await Promise.all(universities.map(async (university) => {
      const { _id, name, idReferencesRegion, idReferencesProvince, type, license, campuses, image } = university;
      const regions = await Promise.all(idReferencesRegion.map(async (idReferenceRegion) => {
        return await RegionModel.findOne({ idReference: idReferenceRegion });
      }));
      const provinces = await Promise.all(idReferencesProvince.map(async (idReferenceProvince) => {
        return await ProvinceModel.findOne({ idReference: idReferenceProvince });
      }));
      return {
        _id,
        name,
        regions,
        provinces,
        type,
        license,
        campuses,
        image,
      };
    }));
    return universitiesResponse;
  },
  getUniversitiesByType: async (_: any, { input }: { input: { type: string } }) => {
    const { type } = input;
    const universities: IUniversity[] = await UniversityModel.find({ type });
    const universitiesResponse = await Promise.all(universities.map(async (university) => {
      const { _id, name, idReferencesRegion, idReferencesProvince, type, license, campuses, image } = university;
      const regions = await Promise.all(idReferencesRegion.map(async (idReferenceRegion) => {
        return await RegionModel.findOne({ idReference: idReferenceRegion });
      }));
      const provinces = await Promise.all(idReferencesProvince.map(async (idReferenceProvince) => {
        return await ProvinceModel.findOne({ idReference: idReferenceProvince });
      }));
      return {
        _id,
        name,
        regions,
        provinces,
        type,
        license,
        campuses,
        image,
      };
    }));
    return universitiesResponse;
  },
  getUniversityById: async (_: any, { id }: { id: string }) => {
    try {
      const university: IUniversity | null = await UniversityModel.findById(id);
      if (!university) throw new Error('university not found');
      const { _id, name, idReferencesRegion, idReferencesProvince, type, license, campuses, image } = university;
      const regions = await Promise.all(idReferencesRegion.map(async (idReferenceRegion) => {
        return await RegionModel.findOne({ idReference: idReferenceRegion });
      }));
      const provinces = await Promise.all(idReferencesProvince.map(async (idReferenceProvince) => {
        return await ProvinceModel.findOne({ idReference: idReferenceProvince });
      }));
      const comments: ICommentUniversity[] = await CommentUniversityModel.find({ idUniversity: _id });
      const commentsResponse = await Promise.all(comments.map(async (comment: ICommentUniversity) => {
        const { _id, idUniversity, idUser, content, createdAt, updatedAt } = comment;
        const user: IUser | null = await UserModel.findById(idUser);
        if (!user) throw new Error('user not found');
        return {
          id: _id,
          idUniversity,
          idUser,
          content,
          createdAt,
          updatedAt,
          nameUser: user.name,
          imageUser: user.image,
        };
      }));
      return {
        _id,
        name,
        regions,
        provinces,
        type,
        license,
        campuses,
        image,
        comments: commentsResponse,
      };
    } catch (error: any) {
      return {
        errors: { message: error.message }
      }
    }
  }
};

const mutations = {
  createUniversity: async (_: any, { input }: CreateUniversity) => {
    const university = new UniversityModel(input);
    const newUniversity: IUniversity = await university.save();
    return newUniversity;
  },
  deleteUniversity: async (_: any, { id }: { id: string }) => {
    const university: IUniversity | null = await UniversityModel.findByIdAndRemove(id);
    if (!university) throw new Error('university not found');
    return university;
  }
};

export const resolvers = { queries, mutations };
