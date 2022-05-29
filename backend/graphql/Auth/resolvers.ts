import { CreateUser, Login } from '../../src/auth/entity/types/authTypes';
import { passwordManager } from '../../src/auth/utils/passwordManager';
import { tokenService } from '../../src/auth/utils/tokenManager';
import { UserModel } from '../../src/user/entity/models/userModel';
import { IUser } from '../../src/user/entity/types/userTypes';

const queries = {};

const mutations = {
  createUser: async (_: any, { userRequest }: CreateUser) => {
    try {
      if (userRequest.password.length < 8) throw new Error('length');
      userRequest.password = await passwordManager.encryptText(userRequest.password);
      const user = new UserModel(userRequest);
      const newUser: IUser = await user.save();
      if (newUser) {
        const { _id, name, email, age, image, username, role, provider } = newUser;
        return {
          token: tokenService.createToken({ id: _id, name, email, age, image, username, role, provider })
        }
      } else {
        throw new Error('error');
      }
    } catch (error: any) {
      return {
        errors: { message: error.message }
      }
    }
  },
  login: async (_: any, { loginRequest }: Login) => {
    try {
      const user: IUser | null = await UserModel.findOne({ email: loginRequest.email });
      if (user) {
        const isValid = passwordManager.validatePassword(loginRequest.password, user.password);
        if (isValid) {
          const { _id, name, email, age, image, username, role, provider } = user;
          return {
            token: tokenService.createToken({ id: _id, name, email, age, image, username, role, provider })
          }
        } else {
          throw new Error('invalid password');
        }
      } else {
        throw new Error('email not found');
      }
    } catch (error: any) {
      return {
        errors: { message: error.message }
      }
    }
  },
  loginAdmin: async (_: any, { loginRequest }: Login) => {
    try {
      const user: IUser | null = await UserModel.findOne({ email: loginRequest.email });
      if (user) {
        if (user.role === 'admin' || user.role === 'super') {
          const isValid = passwordManager.validatePassword(loginRequest.password, user.password);
          if (isValid) {
            const { _id, name, email, age, image, username, role, provider } = user;
            return {
              token: tokenService.createToken({ id: _id, name, email, age, image, username, role, provider })
            }
          } else {
            throw new Error('invalid password');
          }
        } else {
          throw new Error('not admin');
        }
      } else {
        throw new Error('email not found');
      }
    } catch (error: any) {
      return {
        errors: { message: error.message }
      }
    }
  }
};

export const resolvers = { queries, mutations };
