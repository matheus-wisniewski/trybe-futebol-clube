import SequelizeTeam from './SequelizeTeams';
import { Team } from '../../Interfaces/teams/Team';
import { MyTeamModel } from '../../Interfaces/teams/TeamModel';

export default class TeamModel implements MyTeamModel {
  private model = SequelizeTeam;
  async findAll(): Promise<Team[]> {
    const data = await this.model.findAll();
    return data.map((teams) => teams.toJSON());
  }

  async findById(id: Team['id']): Promise<Team | null> {
    const data = await this.model.findByPk(id);
    // if (data=== null) ?
    if (data == null) return null;
    return data.toJSON();
  }
}
