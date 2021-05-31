import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListApprovedUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
        throw new AppError('User does not exist.');
    }

    const users = await this.usersRepository.findAllUsersSimilar(user.course_id);

    return users;
  }
}

export default ListApprovedUsersService;
