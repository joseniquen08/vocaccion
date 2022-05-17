import { UserModel } from '../../src/user/entity/models/userModel';

const queries = {
  getAllUsers: async () => {
    return await UserModel.find({});
  },
};

const mutations = {
  
};

export const resolvers = { queries, mutations };
