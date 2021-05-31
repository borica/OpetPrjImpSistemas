import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFriendsRepository from '../repositories/IFriendsRepository';
import Friends from '../infra/typeorm/entities/Friends';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAllFriendsService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Friends[]> {
    const friends = await this.friendsRepository.findFriendsByUserId(user_id);

    if (!friends) {
      throw new AppError('Friend request not found.');
    }

    return friends;
  }
}

export default ListAllFriendsService;
