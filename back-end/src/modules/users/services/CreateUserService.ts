import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import { parseISO } from 'date-fns';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import ICoursesRepository from '@modules/course/repositories/ICoursesRepository';

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  birth_date: string;
  course_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ name, email, username, password, birth_date, course_id }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const CheckUsernameExists = await this.usersRepository.findByUsername(username);

    if (CheckUsernameExists) {
      throw new AppError('Username address already used.');
    }

    const checkCourseExists = await this.coursesRepository.findById(course_id);

    if (!checkCourseExists) {
      throw new AppError('Course does not exist.');
    }

    const hashedPassword = await hash(password, 8);

    const userDate = new Date(birth_date);

    const user = await this.usersRepository.create({
      name,
      email,
      username,
      password: hashedPassword,
      birth_date: userDate,
      course_id
    });

    const findUser = await this.usersRepository.findById(user.id);

    if (!findUser) {
      throw new AppError('Erro no cadastro.');
    }

    return findUser;
  }
}

export default CreateUserService;
