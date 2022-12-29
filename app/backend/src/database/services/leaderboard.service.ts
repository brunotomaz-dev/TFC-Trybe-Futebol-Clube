import { ILeaderboard } from '../interface/Leaderboard.interface';
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

  public async leaderBoard(filter: homeAway) {
    const allMatchsFinished = await this.getMatches();

    if (filter === 'home') {
      const leaderboard = await this.getLeaderboard(allMatchsFinished);
      return LeaderBoardService.order(leaderboard);
    }

    if (filter === 'away') {
      const leaderboard = await this.getLeaderboard(allMatchsFinished, 'away');
      return LeaderBoardService.order(leaderboard);
    }
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
      test = this.formLeaderboard(match, teamName, getMatchByTeam, test);
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
      test = this.formLeaderboard(match, teamName, getMatchByTeam, test);
    });

    return test;
  }

  private formLeaderboard = (
    { awayTeamGoals: GC, homeTeamGoals: GP }: IMatch,
    teamName: string,
    allMatch: IMatch[],
    prev: ILeaderboard,
  ) => {
    const newleaderBoard = {
      name: teamName,
      totalPoints: prev.totalPoints + calc.totalPoints(GP, GC),
      totalGames: allMatch.length,
      totalVictories: prev.totalVictories + calc.winOrLose(GP, GC, 'wins'),
      totalDraws: prev.totalDraws + calc.winOrLose(GP, GC, 'draws'),
      totalLosses: prev.totalLosses + calc.winOrLose(GP, GC, 'losses'),
      goalsFavor: prev.goalsFavor + GP,
      goalsOwn: prev.goalsOwn + GC,
      goalsBalance: prev.goalsBalance + calc.goalsBalance(GP, GC),
      efficiency: calc.efficiency(GP, GC, prev.totalPoints, allMatch.length),
    };

    return newleaderBoard;
  };
}
