import { Router } from 'express';
import AuthController from '../controllers/Auth.controller';
import ValidateLoginController from '../controllers/ValidateLogin.controller';

const authRouter = Router();
const authController = new AuthController();
const validateController = new ValidateLoginController();

authRouter.post('/', (req, res) => authController.authLogin(req, res));
authRouter.get('/validate', (req, res) => validateController.validateLogin(req, res));

export default authRouter;
