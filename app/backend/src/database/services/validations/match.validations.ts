import * as errors from 'restify-errors';

export default class MatchValidations {
  private _awayTeam: number;
  private _homeTeam: number;

  constructor(homeTeam: number, awayTeam: number) {
    this._homeTeam = homeTeam;
    this._awayTeam = awayTeam;
  }

  verifyDuplicateTeam() {
    const isDuplicated = this._awayTeam === this._homeTeam;

    if (isDuplicated) {
      throw new errors
        .UnprocessableEntityError('It is not possible to create a match with two equal teams');
    }
  }
}
