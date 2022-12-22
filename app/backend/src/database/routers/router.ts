import { Router } from 'express';
import authRouter from './auth.router';
import matchesRouter from './matches.router';
import teamsRouter from './teams.router';

const router = Router();

router.use('/login', authRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
