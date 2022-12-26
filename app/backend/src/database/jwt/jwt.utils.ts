import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import * as errors from 'restify-errors';
import { IUser } from '../interface/Login.interfaces';

export function createToken(obj: IUser): string {
  const SECRET_KEY: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
  const { id, username, role } = obj;

  const token = jwt.sign({ id, username, role }, SECRET_KEY, {
    expiresIn: '30d',
    algorithm: 'HS256',
  });

  return token;
}

export function validateToken(token: string): IUser {
  const SECRET_KEY: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;

  try {
    const decode = jwt.verify(token, SECRET_KEY);
    return decode as IUser;
  } catch (err) {
    throw new errors.UnauthorizedError('Token must be a valid token');
  }
}
