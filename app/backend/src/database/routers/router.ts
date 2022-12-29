import { Router } from 'express';
import authRouter from './auth.router';
import leaderBoardRouter from './leaderboard.router';
import matchesRouter from './matches.router';
import teamsRouter from './teams.router';

const router = Router();

router.use('/login', authRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
