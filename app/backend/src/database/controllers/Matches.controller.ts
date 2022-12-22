import { Request, Response } from 'express';
import MatchService from '../services/Matches.Service';

export default class MatchController {
  private matchService = new MatchService();

  async getAllMatches(req: Request, res: Response) {
    const matches = await this.matchService.allMatches();

    res.status(200).json(matches);
  }
}
