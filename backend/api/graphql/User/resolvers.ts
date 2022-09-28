import { tokenService } from '../../src/auth/utils/tokenManager';
import { UserModel } from '../../src/user/entity/models/userModel';
import { IUser, UpdateImageUser, UpdateUser, UpdateUserWhitoutProvider } from '../../src/user/entity/types/userTypes';

const queries = {
  getUserById: async (_: any, { id }: { id: string }) => {
    const user = await UserModel.findById(id);
    if (user) {
      return user;
    }
    return null;
  },
  getAllUsers: async () => {
    return await UserModel.find({});
  },
};

const mutations = {
  updateUser: async (_: any, { input }: UpdateUser) => {
    try {
      const { email, age } = input;
      const updatedUser: IUser | null = await UserModel.findOneAndUpdate(
        { email },
        { age },
        { new: true }
      );
      if (!updatedUser) throw new Error('user not found');
      return {
        user: updatedUser,
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateUserWhitoutProvider: async (_: any, { input }: UpdateUserWhitoutProvider) => {
    try {
      const updatedUser: IUser | null = await UserModel.findOneAndUpdate(
        { email: input.email },
        { username: input.username, name: input.name, age: input.age },
        { new: true }
      );
      if (!updatedUser) throw new Error('user not found');
      const { _id, name, email, age, image, username, role, provider, emailVerifiedV } = updatedUser;
      return {
        token: tokenService.createToken({ id: _id, name, email, age, image, username, role, provider, emailVerifiedV }),
        user: updatedUser,
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateImageUser: async (_: any, { input }: UpdateImageUser) => {
    try {
      const updatedUser: IUser | null = await UserModel.findOneAndUpdate(
        { email: input.email },
        { image: input.image },
        { new: true }
      );
      if (!updatedUser) throw new Error('user not found');
      const { _id, name, email, age, image, username, role, provider, emailVerifiedV } = updatedUser;
      return {
        token: tokenService.createToken({ id: _id, name, email, age, image, username, role, provider, emailVerifiedV }),
        user: updatedUser,
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const resolvers = { queries, mutations };
