import { Router } from 'express';

import FriendController from '../controllers/FriendController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const friendRouter = Router();
const friendController = new FriendController();

friendRouter.use(ensureAuthenticated);

friendRouter.post('/invite', friendController.invite);

friendRouter.post('/accept', friendController.accept);

friendRouter.get('/', friendController.list);

friendRouter.get('/pending', friendController.listPending);

friendRouter.delete('/reject', friendController.deleteFriendRequest);

export default friendRouter;
