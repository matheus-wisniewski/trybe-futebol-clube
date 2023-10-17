import { Request, Response } from 'express';
import mapStatusHTTP from '../tests/utils/mapStatusHTTP';
import MatchService from '../services/matches.service';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    console.log(inProgress);
    // if(inProgress || !inProgress)
    if (inProgress === 'true' || inProgress === 'false') {
      const { status, data } = await this.matchService.findByInProgress(String(inProgress));
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchService.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async findByFinish(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.matchService.findByFinish(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const teamGoals = req.body;
    console.log(teamGoals);
    const { status, data } = await this.matchService.update(Number(id), teamGoals);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async insert(req: Request, res:Response): Promise<Response> {
    const {
      status,
      data } = await this.matchService.insert(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
