import { PinModel } from '../../src/auth/entity/models/authModels';
import { CreateUser, IPin, Login, VerifyEmail } from '../../src/auth/entity/types/authTypes';
import { emailVerificationService } from '../../src/auth/services/emailVerificationServices';
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
        const { _id, name, email, age, image, username, role, provider, emailVerifiedV } = newUser;
        await emailVerificationService(email);
        return {
          token: tokenService.createToken({ id: _id, name, email, age, image, username, role, provider, emailVerifiedV })
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
          const { _id, name, email, age, image, username, role, provider, emailVerifiedV } = user;
          return {
            token: tokenService.createToken({ id: _id, name, email, age, image, username, role, provider, emailVerifiedV })
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
            const { _id, name, email, age, image, username, role, provider, emailVerifiedV } = user;
            return {
              token: tokenService.createToken({ id: _id, name, email, age, image, username, role, provider, emailVerifiedV })
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
  },
  verifyEmail: async (_: any, { verifyRequest }: VerifyEmail) => {
    try {
      const pinFound: IPin | null = await PinModel.findOne(verifyRequest);
      if (pinFound) {
        const { email } = pinFound;
        const updatedUser: IUser | null = await UserModel.findOneAndUpdate(
          { email },
          { emailVerifiedV: true },
          { new: true }
        );
        if (!updatedUser) throw new Error('user not found');
        await PinModel.deleteOne({ email });
        const { _id, name, age, image, username, role, provider, emailVerifiedV } = updatedUser;
        return {
          token: tokenService.createToken({ id: _id, name, email, age, image, username, role, provider, emailVerifiedV })
        }
      } else {
        throw new Error('not pin');
      }
    } catch (error: any) {
      return {
        errors: { message: error.message }
      }
    }
  }
};

export const resolvers = { queries, mutations };
