import { Router } from 'express';
import authRouter from './auth.router';
import teamsRouter from './teams.router';

const router = Router();

router.use('/login', authRouter);
router.use('/teams', teamsRouter);

export default router;
