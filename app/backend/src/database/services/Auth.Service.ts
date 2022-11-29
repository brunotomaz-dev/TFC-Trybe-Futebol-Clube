import * as Joi from 'joi';
import * as errors from 'restify-errors';
import * as bcrypt from 'bcryptjs';
import { IAuthUser, IUser } from '../interface/Login.interfaces';
import UsersModel from '../models/Users';
import createToken from '../jwt/jwt.utils';

const ERROR_MESSAGE_EMAIL_PASSWORD = 'Incorrect email or password';
const ERROR_MESSAGE_REQUIRED = 'All fields must be filled';

export default class AuthService {
  private authValidation = Joi.object<IAuthUser>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  static authPassword(pass: string, cryptoPass: string): boolean {
    return bcrypt.compareSync(pass, cryptoPass);
  }

  async authUser({ email, password }: IAuthUser): Promise<string> {
    const { error } = this.authValidation.validate({ email, password });

    if (error) {
      throw new errors.BadRequestError(ERROR_MESSAGE_REQUIRED);
    }

    const user = await UsersModel.findOne({ where: { email } });

    if (!user || !AuthService.authPassword(password, user.password)) {
      throw new errors.UnauthorizedError(ERROR_MESSAGE_EMAIL_PASSWORD);
    }

    // if () {
    //   throw new errors.UnauthorizedError(ERROR_MESSAGE_EMAIL_PASSWORD);
    // }

    const token = createToken(user.dataValues as IUser);

    return token;
  }
}
