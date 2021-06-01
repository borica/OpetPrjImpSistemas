import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import PostController from '../controllers/PostController';

const postsRouter = Router();
const postController = new PostController();

const upload = multer(uploadConfig);

postsRouter.use(ensureAuthenticated);

postsRouter.post('/', upload.single('post'), postController.create);

postsRouter.post('/like', postController.likePostById);

postsRouter.get('/', postController.get);

postsRouter.get('/list', postController.listAllPosts);

export default postsRouter;
