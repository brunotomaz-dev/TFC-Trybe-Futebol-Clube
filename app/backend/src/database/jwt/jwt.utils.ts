import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interface/Login.interfaces';

export default function createToken(obj: IUser): string {
  const SECRET_KEY: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
  const { password, ...newObj } = obj;

  const token = jwt.sign(newObj, SECRET_KEY, {
    expiresIn: '30d',
    algorithm: 'HS256',
  });

  return token;
}
