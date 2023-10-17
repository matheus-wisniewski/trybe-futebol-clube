import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();
const router = Router();

router.get('/home', (req:
Request, res: Response) => leaderboardController.findAll(req, res));
router.get('/away', (req:
Request, res: Response) => leaderboardController.findAll(req, res));
export default router;
