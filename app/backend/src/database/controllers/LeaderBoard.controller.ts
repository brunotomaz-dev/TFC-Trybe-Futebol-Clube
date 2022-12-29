import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  private leaderBoardService = new LeaderBoardService();

  async homeLeaderboard(req: Request, res: Response) {
    const homeBoard = await this.leaderBoardService.leaderBoard('home');

    res.status(200).json(homeBoard);
  }

  async awayLeaderboard(req: Request, res: Response) {
    const awayBoard = await this.leaderBoardService.leaderBoard('away');

    res.status(200).json(awayBoard);
  }

  async fullLeaderboard(req: Request, res: Response) {
    const fullBoard = await this.leaderBoardService.leaderBoard();

    res.status(200).json(fullBoard);
  }
}
