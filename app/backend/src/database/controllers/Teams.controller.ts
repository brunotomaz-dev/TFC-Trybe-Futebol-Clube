import { Request, Response } from 'express';
import TeamsService from '../services/Teams.Service';

export default class TeamsController {
  private teamsService = new TeamsService();

  async getAllTeams(req: Request, res: Response) {
    const allTeams = await this.teamsService.allTeams();

    res.status(200).json(allTeams);
  }
}
