import { IMatch } from '../interface/Matches.interface';
import MatchesModel from '../models/Matches';

export default class MatchService {
  /*
  Outra forma que posso usar:

  private matchesModel;

  constructor() {
    this.matchesModel = MatchesModel;
  }
  */
  constructor(private matchesModel = MatchesModel) {}

  async allMatches(): Promise<IMatch[]> {
    const matches = await this.matchesModel.findAll({
      include: {
        all: true,
        attributes: { exclude: ['id'] },
      },
    });

    return matches;
  }

  async allMatchesFilteredByProgress(inProgress: boolean): Promise<IMatch[]> {
    const matches = await this.matchesModel.findAll({
      where: { inProgress },
      include: {
        all: true,
        attributes: { exclude: ['id'] },
      },
    });

    return matches;
  }
}
