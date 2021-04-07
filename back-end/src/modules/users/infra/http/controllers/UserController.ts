import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, birth_date, course_id } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      username,
      email,
      password,
      birth_date,
      course_id
    });

    return response.status(200).json({ user: classToClass(user) });
  }

  public async signUp(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createSession = container.resolve(AuthenticateUserService);

    const { user, token } = await createSession.execute({ username, password });

    return response.status(200).json({ user: classToClass(user), token });
  }
}
