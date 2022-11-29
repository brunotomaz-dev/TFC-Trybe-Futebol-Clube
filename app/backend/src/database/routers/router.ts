import { Router } from 'express';
import authRouter from './auth.router';

const router = Router();

router.use('/login', authRouter);

export default router;
