import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import Posts from '@modules/posts/infra/typeorm/entities/Posts';

export default interface IPostsRepository {
    create(data: ICreatePostDTO): Promise<Posts>;
    save(post: Posts): Promise<void>;
    findById(id: string): Promise<Posts | undefined>;
    findAll(): Promise<Posts[]>;
    addLike(post: Posts): Promise<Posts>;
}