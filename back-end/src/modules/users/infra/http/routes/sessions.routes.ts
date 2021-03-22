import { Router } from 'express';

import UserController from '../controllers/UserController';

const sessionsRouter = Router();
const userController = new UserController();

sessionsRouter.post('/', userController.signUp);

export default sessionsRouter;
