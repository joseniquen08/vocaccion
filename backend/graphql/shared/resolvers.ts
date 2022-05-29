import { CareerModel } from '../../src/career/entity/models/careerModel';
import { CommentCareerModel, CommentUniversityModel } from '../../src/comment/entity/models/commentModels';
import { UniversityModel } from '../../src/university/entity/models/universityModel';
import { UserModel } from '../../src/user/entity/models/userModel';

const queries = {
  getInfoDashboardHome: async () => {
    const totalCareers = await CareerModel.estimatedDocumentCount();
    const totalUniversities = await UniversityModel.estimatedDocumentCount();
    const totalUsers = await UserModel.estimatedDocumentCount();
    const totalCommentsCareer = await CommentCareerModel.estimatedDocumentCount();
    const totalCommentsUniversity = await CommentUniversityModel.estimatedDocumentCount();
    return {
      totalCareers,
      totalUniversities,
      totalUsers,
      totalComments: totalCommentsCareer + totalCommentsUniversity,
    }
  }
};

const mutations = {};

export const resolvers = { queries, mutations };
