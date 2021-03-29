import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import UserAvatarController from '../controllers/UpdateUserAvatarService';

import UserController from '../controllers/UserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UserController();
const forgotPasswordController = new ForgotPasswordController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.post('/forgot', forgotPasswordController.create);

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
  );

export default usersRouter;
