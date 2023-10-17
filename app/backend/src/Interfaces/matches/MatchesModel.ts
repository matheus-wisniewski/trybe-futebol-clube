import { MyMatches, TeamGoals } from './Matches';
import { ID } from '..';
import { Team } from '../teams/Team';

export type MatchesModel = { findAll(): Promise<MyMatches[]>,
  findByProgress(inProgress: boolean): Promise<MyMatches[]>,
  findByFinish(id: ID): Promise<number | null>,
  update(id: number, teamGoals: TeamGoals): Promise<number | null>,
  insert(data: Omit<MyMatches, 'id'>): Promise<MyMatches>, findById(id: ID): Promise<Team | null> };
