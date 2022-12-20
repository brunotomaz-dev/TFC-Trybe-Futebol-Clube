import { ITeam } from '../interface/Teams.interfaces';
import TeamsModel from '../models/Teams';

export default class TeamsService {
  allTeams = async (): Promise<ITeam[]> => {
    const teams = await TeamsModel.findAll();

    return teams;
  };
}
