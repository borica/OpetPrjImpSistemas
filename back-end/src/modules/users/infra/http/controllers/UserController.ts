import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import ApprovedUserService from '@modules/users/services/ApprovedUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ListUnapprovedUsersService from '@modules/users/services/ListUnapprovedUsersService';
import ListApprovedUsersService from '@modules/users/services/ListApprovedUsersService';
import ListSimilarUsersService from '@modules/users/services/ListSimilarUsersService';

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

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ user_id });

    return response.status(200).send();
  }

  public async listUnapprovedUsers(request: Request, response: Response): Promise<Response> {
    const listUnapprovedUsers = container.resolve(ListUnapprovedUsersService);

    const users = await listUnapprovedUsers.execute();

    return response.status(200).json({ users });
  }

  public async listApprovedUsers(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listApprovedUsers = container.resolve(ListApprovedUsersService);

    const users = await listApprovedUsers.execute(id);

    return response.status(200).json({ users });
  }

  public async listSimilarUsers(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    
    const listSimilarUsers = container.resolve(ListSimilarUsersService);

    const users = await listSimilarUsers.execute(id);

    return response.status(200).json({ users });
  }
}
