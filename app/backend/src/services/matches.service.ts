import MatchModel from '../database/models/matches.model';
import { MatchesModel } from '../Interfaces/matches/MatchesModel';
import { MyMatches, TeamGoals } from '../Interfaces/matches/Matches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(private matchModel: MatchesModel = new MatchModel()) {}

  public async findAll(): Promise<ServiceResponse<MyMatches[]>> {
    const matches = await this.matchModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: matches,
    };
  }

  public async findByInProgress(inProgress: string): Promise<ServiceResponse<MyMatches[]>> {
    const progressStatus = inProgress === 'true';
    const getAllMatches = await this.matchModel.findByProgress(progressStatus);

    return {
      status: 'SUCCESSFUL',
      data: getAllMatches,
    };
  }

  public async findByFinish(id: number): Promise<ServiceResponse<{ message: string }>> {
    const newMatch = await this.matchModel.findByFinish(id);
    console.log(newMatch);
    if (!newMatch) {
      return {
        status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }
    return {
      status: 'SUCCESSFUL',
      data: { message: 'Finished' },
    };
  }

  public async update(id: number, teamGoals: TeamGoals):
  Promise<ServiceResponse<{ message: string }>> {
    const updatedGoals = await this.matchModel.update(id, teamGoals);
    if (!updatedGoals) {
      return {
        status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }
    return {
      status: 'SUCCESSFUL',
      data: { message: 'Goals Updated' },
    };
  }

  public async insert(data: Omit<MyMatches, 'id'>): Promise<ServiceResponse<MyMatches>> {
    const { homeTeamId, awayTeamId } = data;
    if (homeTeamId === awayTeamId) {
      return {
        status: 'INVALID_VALUE',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const timeDaCasa = await this.matchModel.findById(homeTeamId);
    const visitante = await this.matchModel.findById(awayTeamId);

    if (!timeDaCasa || !visitante) {
      return {
        status: 'NOT_FOUND',
        data: {
          message: 'There is no team with such id!',
        } };
    }
    const insertNewMatch = await this.matchModel.insert(data);
    return {
      status: 'CREATED', data: insertNewMatch };
  }
}
