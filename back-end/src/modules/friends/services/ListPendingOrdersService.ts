import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFriendsRepository from '../repositories/IFriendsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}
interface IFriendsResponse {
  id: string;
  accept: Boolean;
  created_at: string;
  updated_at: string;
  user: User
}

@injectable()
class ListPendingOrdersService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IFriendsResponse[]> {
    const friends = await this.friendsRepository.findPendingFriendsByUserId(user_id);

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

export default ListPendingOrdersService;
