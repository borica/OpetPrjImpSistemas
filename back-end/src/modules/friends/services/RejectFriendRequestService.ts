import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFriendsRepository from '../repositories/IFriendsRepository';

interface IRequest {
    friendRequestId: string;
}

@injectable()
class RejectFriendRequestService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository
  ) {}

  public async execute({ friendRequestId }: IRequest): Promise<void> {
    const friendRequest = await this.friendsRepository.findFriendRequestById(friendRequestId);

    if (!friendRequest) {
      throw new AppError('User does not exist.');
    }

    await this.friendsRepository.delete(friendRequest);
  }
}

export default RejectFriendRequestService;
