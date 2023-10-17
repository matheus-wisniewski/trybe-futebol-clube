import { Request, Response } from 'express';
import mapStatusHTTP from '../tests/utils/mapStatusHTTP';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async findAll(req: Request, res: Response): Promise<Response> {
    // as vírgulas indicam que os dois primeiros elementos do array não são necessários
    const [,, path] = req.originalUrl.split('/');
    console.log(path);
    const {
      status, data,
    } = await this.leaderboardService.findAll(path);
    // return res.status().json
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
