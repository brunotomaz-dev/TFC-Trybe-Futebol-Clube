import * as errors from 'restify-errors';
import { ITeam } from '../interface/Teams.interfaces';
import TeamsModel from '../models/Teams';

const ERROR_MESSAGE_INVALID_ID = 'O id informado não é válido';
export default class TeamsService {
  // primeiro fiz com arrow function e depois testei usando construtor e método... qual seria melhor?
  constructor(private teamsModel = TeamsModel) {}

  allTeams = async (): Promise<ITeam[]> => {
    const teams = await TeamsModel.findAll();

    return teams;
  };

  async teamsById(id: number): Promise<ITeam> {
    const team: ITeam | null = await this.teamsModel.findByPk(id);

    if (!team) {
      throw new errors.BadRequestError(ERROR_MESSAGE_INVALID_ID);
    }

    return team;
  }
}
