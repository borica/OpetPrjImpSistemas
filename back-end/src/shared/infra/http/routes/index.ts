import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import coursesRouter from '@modules/course/infra/http/routes/course.routes';
import friendRouter from '@modules/friends/infra/http/routes/friend.route';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter);
routes.use('/courses', coursesRouter);
routes.use('/friends', friendRouter);

export default routes;
