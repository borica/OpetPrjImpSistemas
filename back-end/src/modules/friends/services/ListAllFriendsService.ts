import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFriendsRepository from '../repositories/IFriendsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Friends from '../infra/typeorm/entities/Friends';

interface IRequest {
  user_id: string;
}

interface IResponse {
  id: string,
  name: string,
  username: string,
  email: string,
  avatar: string,
  birth_date: string,
  isAdmin: Boolean,
  approved: Boolean,
  created_at: string,
  updated_at: string 
}

@injectable()
class ListAllFriendsService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IResponse[]> {
    const friends = await this.friendsRepository.findFriendsByUserId(user_id);

    if (!friends) {
      throw new AppError('Friend request not found.');
    }

    const responseFriends: IResponse[] = [];

    friends.map(friend => {
      if (friend.user.id === user_id) {
        delete friend.user;
        responseFriends.push(Object.assign({friend: friend.friend}));
      } 

      if (friend.friend.id === user_id) {
        delete friend.friend;
        responseFriends.push(Object.assign({friend: friend.user}));
      }

    })

    return responseFriends;
  }
}

export default ListAllFriendsService;
