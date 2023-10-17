import LeaderboardModel from '../database/models/leaderboard.model';
import { MyLeaderboard } from '../Interfaces/leaderboard/MyLeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardData from '../leaderboard.data';
import { MyMatches } from '../Interfaces/matches/Matches';
import { MyLeaderboardModel } from '../Interfaces/leaderboard/LeaderboardModel';
import leaderboarder from '../tests/utils/tabelao';

export default class LeaderboardService {
  constructor(private leaderboardModel: MyLeaderboardModel = new LeaderboardModel()) {}
  public async findAll(path: string): Promise<ServiceResponse<MyLeaderboard[]>> {
    const findLeaderboard = await this.leaderboardModel.findAll(path);
    const mapLeaderboard = findLeaderboard.map((data) => {
      const newLeaderboard = new LeaderboardData(data.teamName);
      // check path
      if (path === 'home' || path === 'away') {
        const matches = path === 'home' ? data.homeTeam : data.awayTeam;
        return newLeaderboard.startLeaderBoard(matches as MyMatches[], path);
      }
      return newLeaderboard.startLeaderBoard(data.homeTeam as MyMatches[], path);
    });
    const finalFormatLeaderboard = leaderboarder(mapLeaderboard);
    return { status: 'SUCCESSFUL', data: finalFormatLeaderboard };
  }
}
