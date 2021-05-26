import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import ApprovedUserService from '@modules/users/services/ApprovedUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ListUsersService from '@modules/users/services/ListUsersService';

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

  public async approveUser(request: Request, response: Response): Promise<Response> {
    const { approved, user_id } = request.body;
    
    const approvedUserService = container.resolve(ApprovedUserService);

    const user = await approvedUserService.execute({ approved, user_id});

    return response.status(200).json({ user: classToClass(user) });
  }

  public async deleteUser(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    console.log(user_id)

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ user_id });

    return response.status(200).send();
  }

  public async listUsers(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return response.status(200).json({ users });
  }
}
