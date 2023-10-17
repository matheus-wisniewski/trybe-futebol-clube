import { Identi } from '..';

export interface MyMatches extends Identi, TeamGoals {
  homeTeamId: number,
  awayTeamId: number, inProgress: boolean
}
export type TeamGoals = { homeTeamGoals: number, awayTeamGoals: number };
