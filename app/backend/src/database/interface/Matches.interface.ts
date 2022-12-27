export interface IMatch extends INewMatchinProgress {
  id: number;
  inProgress: boolean;
}

export interface INewMatchinProgress extends IGoals {
  homeTeam: number;
  awayTeam: number;
}

export interface IGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
