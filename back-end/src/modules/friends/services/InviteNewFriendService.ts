import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Friends from '../infra/typeorm/entities/Friends';

import IFriendsRepository from '../repositories/IFriendsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  friend_id: string;
}

@injectable()
class InviteNewFriendService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, friend_id }: IRequest): Promise<Friends> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const friend = await this.usersRepository.findById(friend_id);

    if (!friend) {
      throw new AppError('User does not exist.');
    }

    const friendRequestAlreadyExists = await this.friendsRepository.findFriendRequestExistent(user.id, friend.id);

    if (friendRequestAlreadyExists) {
      throw new AppError('Friend request already exists.');
    }

    const friendResponse = await this.friendsRepository.create({ user: user_id, friend: friend_id, accept: false });

    return friendResponse;
  }
}

export default InviteNewFriendService;
