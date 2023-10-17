import { Team } from '../../Interfaces/teams/Team';
import SequelizeMatches from './SequelizeMatches';
import SequelizeTeam from './SequelizeTeams';
import { MyMatches, TeamGoals } from '../../Interfaces/matches/Matches';
import { MatchesModel } from '../../Interfaces/matches/MatchesModel';

export default class MatchModel implements MatchesModel {
  private model = SequelizeMatches;
  private teamModel = SequelizeTeam;
  async findAll(): Promise<MyMatches[]> {
    const data = await this.model.findAll({
      include: [{ model: this.teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.teamModel,
          as: 'awayTeam',
          attributes: ['teamName'] }],
    });
    return data;
  }

  async findByProgress(inProgress: boolean): Promise<MyMatches[]> {
    const data = await this.model.findAll({
      where: { inProgress },
      include: [{ model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'] }],
    });
    return data;
  }

  async findByFinish(id: number): Promise<number | null> {
    const [affectedRows] = await this.model.update({ inProgress: false }, { where: { id } });
    console.log(affectedRows);
    if (affectedRows === 0) return null;
    return affectedRows;
  }

  async update(id: number, teamGoals: TeamGoals): Promise<number | null> {
    const { homeTeamGoals, awayTeamGoals } = teamGoals;
    const [affectedRows] = await
    this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    if (affectedRows === 0) return null;
    return affectedRows;
  }

  async insert(data: Omit<MyMatches, 'id'>): Promise<MyMatches> {
    const getData = await this.model.create({ ...data, inProgress: true });
    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals,
      inProgress }:MyMatches = getData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async findById(id: Team['id']): Promise<Team | null> {
    const data = await this.teamModel.findByPk(id);
    console.log(data);
    if (data == null) return null;
    return data.toJSON();
  }
}
