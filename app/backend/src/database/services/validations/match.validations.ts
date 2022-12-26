import * as errors from 'restify-errors';
import { Op } from 'sequelize';
import TeamsModel from '../../models/Teams';

export default class MatchValidations {
  private _awayTeam: number;
  private _homeTeam: number;
  private teamsModel;

  constructor(homeTeam: number, awayTeam: number) {
    this._homeTeam = homeTeam;
    this._awayTeam = awayTeam;
    this.teamsModel = TeamsModel;
  }

  public verifyDuplicateTeam() {
    const isDuplicated = this._awayTeam === this._homeTeam;

    if (isDuplicated) {
      throw new errors
        .UnprocessableEntityError('It is not possible to create a match with two equal teams');
    }
  }

  public async verifyIfTeamsExists() {
    const exists = await this.teamsModel.findAll({
      where: {
        id: {
          [Op.or]: [this._homeTeam, this._awayTeam],
        },
      },
    });

    if (exists.length !== 2) {
      throw new errors.NotFoundError('There is no team with such id!');
    }
  }
}
