import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      username,
      email,
      password
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.status(200).json(userWithoutPassword);
  }
}
