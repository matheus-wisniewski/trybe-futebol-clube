import SequelizeTeam from './SequelizeTeams';
import SequelizeMatches from './SequelizeMatches';
import { MyLeaderboardModel } from '../../Interfaces/leaderboard/LeaderboardModel';
import { MyMatchesTeam } from '../../Interfaces/leaderboard/MyLeaderboard';
import { Team } from '../../Interfaces/teams/Team';

export default class LeaderboardModel implements MyLeaderboardModel {
  private matchesModel = SequelizeMatches;
  private teamModel = SequelizeTeam;
  async findAll(path: string): Promise<MyMatchesTeam[] | Team[]> {
    const atributos = ['id',
      'homeTeamId', 'homeTeamGoals', 'awayTeamId', 'awayTeamGoals', 'inProgress'];
    const data = await this.teamModel.findAll({
      include: [{ model: this.matchesModel,
        as: `${path}Team`,
        attributes: atributos,
        where: { inProgress: false },
      }] });
    return data;
  }
}
