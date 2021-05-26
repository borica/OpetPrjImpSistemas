import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    if (!user.approved) {
      throw new AppError('User has not been approved to login', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
