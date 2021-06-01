import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Posts from '../infra/typeorm/entities/Posts';

import IPostsRepository from '../repositories/IPostsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
    user_id: string;
    title: string;
    post_img: string;
}

@injectable()
class InviteNewFriendService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, title, post_img }: IRequest): Promise<Posts> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const fileName = await this.storageProvider.saveFile(post_img);

    const post = await this.postsRepository.create({ user: user.id, title, post_img: fileName, like: 0 });

    return post;
  }
}

export default InviteNewFriendService;
