import { Request, Response } from 'express';
import MatchService from '../services/Matches.Service';

export default class MatchController {
  private matchService = new MatchService();

  async getAllMatches(req: Request, res: Response) {
    const haveQuery = Object.keys(req.query).length !== 0;

    if (haveQuery) {
      const { inProgress } = req.query;
      const matches = await this.matchService
        .allMatchesFilteredByProgress(inProgress === 'true');

      return res.status(200).json(matches);
    }

    const matches = await this.matchService.allMatches();

    res.status(200).json(matches);
  }
}
