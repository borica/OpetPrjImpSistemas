import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Posts from '../infra/typeorm/entities/Posts';

import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
    post_id: string;
}

@injectable()
class ListPostByIdService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ post_id }: IRequest): Promise<Posts> {
    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new AppError('Post does not exist.');
    }

    return post;
  }
}

export default ListPostByIdService;
