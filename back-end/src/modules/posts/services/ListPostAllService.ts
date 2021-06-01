import { injectable, inject } from 'tsyringe';

import Posts from '../infra/typeorm/entities/Posts';

import IPostsRepository from '../repositories/IPostsRepository';

@injectable()
class ListPostByIdService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(): Promise<Posts[]> {
    const post = await this.postsRepository.findAll();

    return post;
  }
}

export default ListPostByIdService;
