import { Request, Response } from 'express';
import AuthService from '../services/Auth.Service';

export default class AuthController {
  private authService = new AuthService();

  async authLogin(req: Request, res: Response) {
    const auth = await this.authService.loginUser(req.body);

    res.status(200).json({ token: auth });
  }
}
