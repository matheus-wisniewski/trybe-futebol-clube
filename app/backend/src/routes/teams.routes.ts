import { Router, Request, Response } from 'express';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController();
const router = Router();
// Rotas
router.get('/', (req:
Request, res: Response) => teamController.findAll(req, res));
router.get('/:id', (req:
Request, res: Response) => teamController.findById(req, res));
export default router;
