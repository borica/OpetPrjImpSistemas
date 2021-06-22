import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFriendsRepository from '../repositories/IFriendsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICoursesRepository from '@modules/course/repositories/ICoursesRepository';

interface IRequest {
  user_id: string;
}

interface IArray {
  id: string,
  name: string,
  username: string,
  email: string,
  avatar: string,
  birth_date: string,
  isAdmin: Boolean,
  approved: Boolean,
  created_at: string,
  updated_at: string 
}

interface IResponse {
  users: [
    {
      id: string,
      name: string,
      username: string,
      email: string,
      avatar: string,
      birth_date: string,
      course_id: string,
      isAdmin: Boolean,
      approved: Boolean,
      created_at: string,
      updated_at: string 
    }
  ]
}

@injectable()
class ListAllFriendsService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IResponse[]> {
    const friends = await this.friendsRepository.findFriendsByUserId(user_id);

    if (!friends) {
      throw new AppError('Friend request not found.');
    }

    const array: IArray[] = [];
    const responseFriends: IResponse[] = [ ];
    const users = {}

    friends.map(friend => {
      if (friend.user.id === user_id) {
        delete friend.user;
        array.push(Object.assign({user: friend.friend}));
      } 

      if (friend.friend.id === user_id) {
        delete friend.friend;
        array.push(Object.assign({user: friend.user}));
      }
    });

    await Promise.all(array.map(async (friend) => {
      console.log(friend);
      const user = await this.usersRepository.findById(friend.user.id);

      if (user) {
        delete user.password;
        responseFriends.push(Object.assign(user));
      }

    }))

    return responseFriends;
  }
}

export default ListAllFriendsService;
