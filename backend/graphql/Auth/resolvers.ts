import { UserInputError } from 'apollo-server-core';
import { CreateUser, Login } from '../../src/auth/entity/types/authTypes';
import { passwordManager } from '../../src/auth/utils/passwordManager';
import { tokenService } from '../../src/auth/utils/tokenManager';
import { UserModel } from '../../src/user/entity/models/userModel';
import { IUser } from '../../src/user/entity/types/userTypes';

const queries = {};

const mutations = {
  createUser: async (_: any, { userRequest }: CreateUser) => {
    if (userRequest.password.length < 8) throw new UserInputError('length');
    userRequest.password = await passwordManager.encryptText(userRequest.password);
    const user = new UserModel(userRequest);
    const newUser: IUser = await user.save();
    if (newUser) {
      const { _id, name, email, age, image, username, role, provider } = newUser;
      return {
        token: tokenService.createToken({ id: _id, name, email, age, image, username, role, provider })
      }
    }
    return null;
  },
  login: async (_: any, { loginRequest }: Login) => {
    const user = await UserModel.findOne({ email: loginRequest.email });
    if (user) {
      const isValid = passwordManager.validatePassword(loginRequest.password, user.password);
      if (isValid) {
        const { _id, name, email, age, image, username, role, provider } = user;
        return {
          token: tokenService.createToken({ id: _id, name, email, age, image, username, role, provider })
        }
      }
    }
    return null;
  }
};

export const resolvers = { queries, mutations };
