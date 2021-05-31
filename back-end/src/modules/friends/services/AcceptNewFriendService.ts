import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFriendsRepository from '../repositories/IFriendsRepository';
interface IRequest {
  friendRequestId: string;
}

@injectable()
class InviteNewFriendService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,
  ) {}

  public async execute({ friendRequestId }: IRequest): Promise<void> {
    const friend = await this.friendsRepository.findFriendRequestById(friendRequestId);

    if (!friend) {
      throw new AppError('Friend request not found.');
    }

    friend.accept = true;

    await this.friendsRepository.save(friend);
  }
}

export default InviteNewFriendService;
