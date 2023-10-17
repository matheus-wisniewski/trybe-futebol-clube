import { Router, Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import Validate from '../middleware/validate.middleware';

const userController = new UserController();

const router = Router();
router.post('/', Validate.validateLogin, (req:
Request, res: Response) => userController.login(req, res));
router.get('/role', Validate.checkToken, (req:
Request, res: Response) => UserController.findRole(req, res));
export default router;
