import { Request, Response } from 'express';
import TeamsService from '../services/Teams.Service';

export default class TeamsController {
  private teamsService = new TeamsService();

  async getAllTeams(req: Request, res: Response) {
    const allTeams = await this.teamsService.allTeams();

    res.status(200).json(allTeams);
  }

  async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;

    const teamsById = await this.teamsService.teamsById(Number(id));

    res.status(200).json(teamsById);
  }
}
