import jwt_decode from 'jwt-decode';
import { TokenType } from '../types/auth';

const decodeToken = (token: string): TokenType => {
  return jwt_decode(token);
}

export default decodeToken;
