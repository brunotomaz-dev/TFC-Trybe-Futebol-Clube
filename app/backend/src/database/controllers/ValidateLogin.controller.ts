import { Request, Response } from 'express';
import AuthService from '../services/Auth.Service';

export default class ValidateLoginController {
  private authService = new AuthService();

  async validateLogin(req: Request, res: Response) {
    const role = await this.authService.validateUser(req.body);

    res.status(200).json({ role });
  }
}
