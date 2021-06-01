import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Posts from '../infra/typeorm/entities/Posts';

import IPostsRepository from '../repositories/IPostsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
    post_id: string;
}

@injectable()
class InviteNewFriendService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ post_id }: IRequest): Promise<Posts> {
    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new AppError('Post does not exist.');
    }

    await this.postsRepository.addLike(post);

    const findPost = await this.postsRepository.findById(post.id);

    if (!findPost) {
      throw new AppError('Post does not exist.');
    }

    return findPost;
  }
}

export default InviteNewFriendService;
