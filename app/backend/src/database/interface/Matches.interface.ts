export interface IMatch extends INewMatchinProgress {
  id: number;
  inProgress: boolean;
}

export interface INewMatchinProgress {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}
