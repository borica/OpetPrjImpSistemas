import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListApprovedUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User[]> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const users = await this.usersRepository.findAllUsersApproved(user);

    return users;
  }
}

export default ListApprovedUsersService;
