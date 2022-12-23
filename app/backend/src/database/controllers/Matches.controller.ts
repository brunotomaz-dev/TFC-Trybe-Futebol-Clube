import { Request, Response } from 'express';
import AuthService from '../services/Auth.Service';
import MatchService from '../services/Matches.Service';

export default class MatchController {
  private matchService = new MatchService();
  private authService = new AuthService();

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

  async createMatches(req: Request, res: Response) {
    await this.authService.validateUser(req.headers.authorization as string);

    const newMatch = await this.matchService.createMatch(req.body);

    res.status(201).json(newMatch);
  }

  async updateMatchProgress(req: Request, res: Response) {
    const { id } = req.params;

    await this.matchService.updateMatchinProgress(Number(id));

    res.status(200).json({ message: 'Finished' });
  }
}
