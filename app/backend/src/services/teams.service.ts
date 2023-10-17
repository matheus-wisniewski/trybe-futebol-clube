import TeamModel from '../database/models/team.model';
import { Team } from '../Interfaces/teams/Team';
import { MyTeamModel } from '../Interfaces/teams/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(private teamModel: MyTeamModel = new TeamModel()) {}
  public async findAll(): Promise<ServiceResponse<Team[]>> {
    const teams = await this.teamModel.findAll();
    return {
      status: 'SUCCESSFUL', data: teams };
  }

  public async findById(id: number): Promise<ServiceResponse<Team>> {
    const teamById = await this.teamModel.findById(id);
    if (!teamById) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return {
      status: 'SUCCESSFUL', data: teamById };
  }
}
