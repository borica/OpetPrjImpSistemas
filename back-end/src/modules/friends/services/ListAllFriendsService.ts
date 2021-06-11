import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFriendsRepository from '../repositories/IFriendsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Friends from '../infra/typeorm/entities/Friends';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAllFriendsService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Friends[]> {
    const friends = await this.friendsRepository.findFriendsAcceptByUserId(user_id);

    if (!friends) {
      throw new AppError('Friend request not found.');
    }

    await Promise.all(friends.map(async (friend) => {
      const user = await this.usersRepository.findById(friend.user.id);
      delete user?.password;
      friend.user = user;
  }));

    return friends;
  }
}

export default ListAllFriendsService;
