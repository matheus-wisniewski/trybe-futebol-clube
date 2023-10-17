import { MyMatches } from './Interfaces/matches/Matches';

export default class LeaderboardData {
  private _name: string; private _totalPoints: number; private _totalGames: number;
  private _totalVictories: number; private _totalDraws: number; private _totalLosses: number;
  private _goalsFavor: number; private _goalsOwn: number; private _goalsBalance: number;
  private _efficiency: number;
  constructor(name: string) {
    this._name = name; this._totalPoints = 0; this._totalGames = 0;
    this._totalVictories = 0; this._totalDraws = 0; this._totalLosses = 0;
    this._goalsFavor = 0; this._goalsOwn = 0; this._goalsBalance = 0;
    this._efficiency = 0;
  }

  private calcPoints(goalsFavor: number, goalsOwn: number) {
    this._goalsFavor += goalsFavor; this._goalsOwn += goalsOwn;
    if (goalsFavor > goalsOwn) {
      this._totalVictories += 1; this._totalPoints += 3;
    }
    if (goalsFavor === goalsOwn) {
      this._totalDraws += 1; this._totalPoints += 1;
    }
    if (goalsFavor < goalsOwn) {
      this._totalLosses += 1;
    }
  }

  private calcEfficiency() {
    this._efficiency = (
      this._totalPoints / (this._totalGames * 3)) * 100;
  }

  private calcBalance() { this._goalsBalance = this._goalsFavor - this._goalsOwn; }

  public get leaderboard() {
    return {
      name: this._name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      efficiency: Number(this._efficiency.toFixed(2)),
      goalsBalance: this._goalsBalance,
    };
  }

  public startLeaderBoard(matches: MyMatches[], path: string) {
    matches.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals } = match;
      this._totalGames += 1;
      if (path === 'home') {
        return this.calcPoints(homeTeamGoals, awayTeamGoals);
      }
      if (path === 'away') {
        return this.calcPoints(awayTeamGoals, homeTeamGoals);
      }
    });
    this.calcEfficiency();
    this.calcBalance();
    return this.leaderboard;
  }
}
