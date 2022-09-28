import { Request } from 'express';
import { tokenService } from '../src/auth/utils/tokenManager';

export const context = ({ req }: { req: Request }) => {
  const token = req.headers.authorization || '';

  const validate = tokenService.validateToken(token);

  if (!validate) throw new Error('Invalid token');

  console.log(validate);
}