import { Router } from 'express';
import AuthController from '../controllers/Auth.controller';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/', (req, res) => authController.authLogin(req, res));

export default authRouter;
