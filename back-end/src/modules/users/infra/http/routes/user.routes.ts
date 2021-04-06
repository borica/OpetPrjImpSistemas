import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import UpdateUserAvatarController from '../controllers/UpdateUserAvatarController';
import ResetPasswordController from '../controllers/ResetPasswordController';

import UserController from '../controllers/UserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UserController();
const forgotPasswordController = new ForgotPasswordController();
const userAvatarController = new UpdateUserAvatarController();
const resetPasswordController = new ResetPasswordController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.post('/forgot', forgotPasswordController.create);

usersRouter.post('/reset', resetPasswordController.create);

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
  );

export default usersRouter;
