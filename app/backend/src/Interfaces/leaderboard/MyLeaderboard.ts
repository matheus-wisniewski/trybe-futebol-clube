import { MyMatches } from '../matches/Matches';
import { Team } from '../teams/Team';

export interface MyMatchesTeam extends Team { homeTeam?: MyMatches[], awayTeam?: MyMatches[], }

export interface MyLeaderboard {
  name: string,
  totalPoints: number, totalGames: number, totalVictories: number,
  totalDraws: number, totalLosses: number, goalsFavor: number,
  goalsOwn: number, efficiency: number, goalsBalance: number,
}
