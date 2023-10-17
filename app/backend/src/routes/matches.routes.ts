import { Router, Request, Response } from 'express';
import Validate from '../middleware/validate.middleware';
import MatchController from '../controllers/matches.controller';

const matchController = new MatchController();
const router = Router();
// rotas
router.get('/', (req:
Request, res: Response) => matchController.findAll(req, res));
router.patch('/:id/finish', Validate.checkToken, (req:
Request, res: Response) => matchController.findByFinish(req, res));
router.patch('/:id', Validate.checkToken, (req:
Request, res: Response) => matchController.update(req, res));
router.post('/', Validate.checkToken, Validate.validateNewMatch, (req:
Request, res: Response) => matchController.insert(req, res));
export default router;
