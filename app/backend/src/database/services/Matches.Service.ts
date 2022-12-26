import * as errors from 'restify-errors';
import { IMatch, INewMatchinProgress } from '../interface/Matches.interface';
import MatchesModel from '../models/Matches';
import MatchValidations from './validations/match.validations';

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

  async createMatch(match: INewMatchinProgress): Promise<IMatch> {
    const matchValidations = new MatchValidations(match.homeTeam, match.awayTeam);

    matchValidations.verifyDuplicateTeam();

    const newMatch = await this.matchesModel.create({ ...match, inProgress: true });

    return newMatch;
  }

  async updateMatchinProgress(id: number): Promise<void> {
    const [affectedCount] = await this.matchesModel.update(
      { inProgress: false },
      { where: { id } },
    );

    console.log(affectedCount);
    if (affectedCount === 0) {
      throw new errors.BadRequestError('Match already had finished status');
    }
  }
}
