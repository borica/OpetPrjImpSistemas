import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUnapprovedUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.findUnwantedUsers();

    return users;
  }
}

export default ListUnapprovedUsersService;
