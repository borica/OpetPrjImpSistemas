import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  approved: boolean;
}

@injectable()
class ApprovedUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, approved }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    user.approved = approved;

    await this.usersRepository.save(user);

    return user;
  }
}

export default ApprovedUserService;
