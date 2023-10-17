import { Request, Response } from 'express';
import UserService from '../services/user.service';
import mapStatusHTTP from '../tests/utils/mapStatusHTTP';

export default class LoginController {
  constructor(private userService = new UserService()) {}
  public async login(req:
  Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const {
      status,
      data } = await this.userService.login(email, password);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public static findRole(_req:
  Request, res: Response): Response {
    const { role,
    } = res.locals.user;
    console.log(role);
    return res.status(200).json({ role });
  }
}
