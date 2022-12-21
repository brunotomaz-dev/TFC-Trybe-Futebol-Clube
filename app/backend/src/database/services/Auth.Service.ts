import * as Joi from 'joi';
import * as errors from 'restify-errors';
import * as bcrypt from 'bcryptjs';
import { IAuthUser, IUser } from '../interface/Login.interfaces';
import UsersModel from '../models/Users';
import { createToken, validateToken } from '../jwt/jwt.utils';

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

  private async authUser(email: string, password: string): Promise<IUser> {
    const { error } = this.authValidation.validate({ email, password });

    if (error) {
      throw new errors.BadRequestError(ERROR_MESSAGE_REQUIRED);
    }

    const user = await UsersModel.findOne({ where: { email } });

    if (!user || !AuthService.authPassword(password, user.password)) {
      throw new errors.UnauthorizedError(ERROR_MESSAGE_EMAIL_PASSWORD);
    }
    return user as IUser;
  }

  async loginUser({ email, password }: IAuthUser): Promise<string> {
    const user: IUser = await this.authUser(email, password);

    const token: string = createToken(user);

    return token;
  }

  private decode = (token: string): IUser => validateToken(token);

  async validateUser(token: string): Promise<string> {
    // validar token
    const { id } = this.decode(token);

    const user = await UsersModel.findByPk(id) as IUser;

    return user.role;
  }
}
