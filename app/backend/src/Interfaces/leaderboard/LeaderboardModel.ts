import { MyMatchesTeam } from './MyLeaderboard';

export type MyLeaderboardModel = { findAll(path: string): Promise<MyMatchesTeam[]> };
