import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

import UserController from '../controllers/UserController';

const usersRouter = Router();
const usersController = new UserController();
const forgotPasswordController = new ForgotPasswordController();

usersRouter.post('/', usersController.create);

usersRouter.post('/forgot', forgotPasswordController.create);

export default usersRouter;
