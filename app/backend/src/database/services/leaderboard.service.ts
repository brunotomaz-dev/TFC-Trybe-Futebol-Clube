import { IFullLeaderGoals, ILeaderboard } from '../interface/Leaderboard.interface';
import { IMatch } from '../interface/Matches.interface';
import MatchesModel from '../models/Matches';
import TeamsModel from '../models/Teams';
import * as calc from './helper/leaderboard.calc';
import { homeAway } from './helper/types';

export default class LeaderBoardService {
  private teamsModel;
  private matchesModel;

  constructor() {
    this.teamsModel = TeamsModel;
    this.matchesModel = MatchesModel;
  }

  private async getTeams() {
    const allTeams = await this.teamsModel.findAll();

    return allTeams;
  }

  private async getMatches() {
    const allMatchsFinished = await this.matchesModel.findAll({ where: { inProgress: false } });

    return allMatchsFinished;
  }

  public async leaderBoard(filter?: homeAway) {
    const allMatchsFinished = await this.getMatches();

    if (filter === 'home') {
      const homeLeaderboard = await this.getLeaderboard(allMatchsFinished);
      return LeaderBoardService.order(homeLeaderboard);
    }

    if (filter === 'away') {
      const leaderboard = await this.getLeaderboard(allMatchsFinished, 'away');
      return LeaderBoardService.order(leaderboard);
    }

    const home = await this.getLeaderboard(allMatchsFinished);
    const away = await this.getLeaderboard(allMatchsFinished, 'away');
    const leaderBoardFull = this.formLeaderboardFull(home, away);

    return LeaderBoardService.order(leaderBoardFull);
  }

  private static order(data: ILeaderboard[]): ILeaderboard[] {
    const leaderboardOrdered = data;

    leaderboardOrdered.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));

    return leaderboardOrdered;
  }

  private async getLeaderboard(matchesFiltered: IMatch[], filter?: homeAway) {
    const allTeams = await this.getTeams();
    const formedLeaderboard = allTeams.map(({ id, teamName }) => {
      const leaderBoard: ILeaderboard = {
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0 };

      if (filter === 'away') {
        return this.leaderboardAway(matchesFiltered, teamName, id, leaderBoard);
      }

      return this.leaderboardHome(matchesFiltered, teamName, id, leaderBoard);
    });

    return formedLeaderboard;
  }

  private leaderboardHome(
    matches: IMatch[],
    teamName: string,
    id: number,
    leaderBoard: ILeaderboard,
  ) {
    let test = leaderBoard;

    const getMatchByTeam = matches.filter(({ homeTeam }) => homeTeam === id);
    getMatchByTeam.forEach((match) => {
      const { awayTeamGoals: gc, homeTeamGoals: gp } = match;
      const homeMatch = { gp, gc };
      test = this.formLeaderboard(homeMatch, teamName, getMatchByTeam, test);
    });

    return test;
  }

  private leaderboardAway(
    matches: IMatch[],
    teamName: string,
    id: number,
    leaderBoard: ILeaderboard,
  ) {
    let test = leaderBoard;

    const getMatchByTeam = matches.filter(({ awayTeam }) => awayTeam === id);
    getMatchByTeam.forEach((match) => {
      const { awayTeamGoals: gp, homeTeamGoals: gc } = match;
      const awayMatch = { gp, gc };
      test = this.formLeaderboard(awayMatch, teamName, getMatchByTeam, test);
    });

    return test;
  }

  private formLeaderboard = (
    { gp, gc }: IFullLeaderGoals,
    teamName: string,
    allMatch: IMatch[],
    prev: ILeaderboard,
  ) => {
    const newleaderBoard = {
      name: teamName,
      totalPoints: prev.totalPoints + calc.totalPoints(gp, gc),
      totalGames: allMatch.length,
      totalVictories: prev.totalVictories + calc.winOrLose(gp, gc, 'wins'),
      totalDraws: prev.totalDraws + calc.winOrLose(gp, gc, 'draws'),
      totalLosses: prev.totalLosses + calc.winOrLose(gp, gc, 'losses'),
      goalsFavor: prev.goalsFavor + gp,
      goalsOwn: prev.goalsOwn + gc,
      goalsBalance: prev.goalsBalance + calc.goalsBalance(gp, gc),
      efficiency: calc.efficiency(gp, gc, prev.totalPoints, allMatch.length),
    };

    return newleaderBoard;
  };

  private formLeaderboardFull = (home: ILeaderboard[], away: ILeaderboard[]) => home.map((team) => {
    const boardAway = away.find(({ name }) => team.name === name) as ILeaderboard;
    return {
      name: team.name,
      totalPoints: team.totalPoints + boardAway.totalPoints,
      totalGames: team.totalGames + boardAway.totalGames,
      totalVictories: team.totalVictories + boardAway.totalVictories,
      totalDraws: team.totalDraws + boardAway.totalDraws,
      totalLosses: team.totalLosses + boardAway.totalLosses,
      goalsFavor: team.goalsFavor + boardAway.goalsFavor,
      goalsOwn: team.goalsOwn + boardAway.goalsOwn,
      goalsBalance: team.goalsBalance + boardAway.goalsBalance,
      efficiency: calc.efficiencyTotal(
        (team.totalPoints + boardAway.totalPoints),
        (team.totalGames + boardAway.totalGames),
      ),
    };
  });
}
