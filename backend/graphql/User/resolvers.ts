import { CreateUser } from '../../src/auth/entity/types/authTypes';
import { passwordManager } from '../../src/auth/utils/passwordManager';
import { tokenService } from '../../src/auth/utils/tokenManager';
import { UserModel } from '../../src/user/entity/models/userModel';
import { IUser } from '../../src/user/entity/types/userTypes';

const queries = {
  getAllUsers: async () => {
    return await UserModel.find({});
  },
};

const mutations = {
  createUser: async (_: any, { userRequest }: CreateUser) => {
    userRequest.password = await passwordManager.encryptText(userRequest.password);
    const user = new UserModel(userRequest);
    const newUser: IUser = await user.save();
    if (newUser) {
      const { _id, email, firstName, lastName } = newUser;
      return {
        token: tokenService.createToken({ id: _id, email , firstName, lastName })
      }
    }
    return null;
  },
};

export const resolvers = { queries, mutations };
