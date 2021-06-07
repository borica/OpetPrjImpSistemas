import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findUnwantedUsers(): Promise<User[]> {
    const users = await this.ormRepository.find({ where: { approved: false }, relations: ['course_id'] });

    return users;
  }
  public async findAllUsersApproved(): Promise<User[]> {
    const users = await this.ormRepository.find({ where: { approved: true }, relations: ['course_id']});

    return users;
  }

  public async findAllUsersSimilar(course_id: string): Promise<User[]> {
    const users = await this.ormRepository.find({ where: { approved: true, course_id: course_id }, relations: ['course_id'] });

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ where: { id }, relations: ['course_id'] });

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
      relations: ['course_id']
    });

    return findUser;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { username },
      relations: ['course_id']
    });

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export default UsersRepository;
