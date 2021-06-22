import { getRepository, Repository } from 'typeorm';

import IFriendsRepository from '@modules/friends/repositories/IFriendsRepository';
import Friends from '../entities/Friends';

import { classToClass } from 'class-transformer';

import ICreateFriendDTO from '@modules/friends/dtos/ICreateFriendDTO';

class FriendsRepository implements IFriendsRepository {
  private ormRepository: Repository<Friends>;

  constructor() {
    this.ormRepository = getRepository(Friends);
  }

  public async findFriendsByUserId(id: string): Promise<Friends[]> {
      const friends = await this.ormRepository.find({ where: [{ user: id }, { friend: id }], relations: ['friend', 'user'] });
      
      return friends;
  }

  public async findFriendsAcceptByUserId(id: string): Promise<Friends[]> {
    const friends = await this.ormRepository.find({ where: { friend: id, accept: true }, relations: ['user'] });
    
    return friends;
}

  public async create(friendData: ICreateFriendDTO): Promise<Friends> {
    const friend = this.ormRepository.create(friendData);

    await this.ormRepository.save(friend);

    return friend;
  }

  public async save(friend: Friends): Promise<void> {
    await this.ormRepository.save(friend);
  }

  public async delete(friend: Friends): Promise<void> {
    await this.ormRepository.remove(friend);
  }

  public async findFriendRequestById(id: string): Promise<Friends | undefined> {
    const friend = await this.ormRepository.findOne({ where: { id } });
    
    return friend;
  }

  public async findPendingFriendsByUserId(user_id: string): Promise<Friends[]> {
    const friends = await this.ormRepository.find({ where: { friend: user_id, accept: false }, relations: ['user'] });
    
    return classToClass(friends);
  }

  public async findFriendRequestExistent(user_id: string, friend_id: string): Promise<Friends | undefined> {
    const friendRequest = await this.ormRepository.findOne({ where: { user: user_id, friend: friend_id, accept: true } });
    
    return friendRequest;
  }
}

export default FriendsRepository;
