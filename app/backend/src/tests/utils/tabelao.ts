import { MyLeaderboard } from '../../Interfaces/leaderboard/MyLeaderboard';
export default function leaderboarder(leaderboard: MyLeaderboard[]) {
  const sortLeaderboard = leaderboard.sort((a, b) => b.goalsFavor - a.goalsFavor)
    .sort((a, b) => b.goalsBalance - a.goalsBalance).sort((a, b) => b.totalPoints - a.totalPoints);
  return sortLeaderboard;
}