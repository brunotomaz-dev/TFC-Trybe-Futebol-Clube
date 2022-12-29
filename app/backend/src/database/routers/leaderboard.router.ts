import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoard.controller';

const leaderBoardRouter = Router();
const leaderBoardController = new LeaderBoardController();

leaderBoardRouter.get('/home', (req, res) => leaderBoardController.homeLeaderboard(req, res));
leaderBoardRouter.get('/away', (req, res) => leaderBoardController.awayLeaderboard(req, res));

export default leaderBoardRouter;
