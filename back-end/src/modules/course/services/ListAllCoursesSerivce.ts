import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(): Promise<Course[]> {
    const courses = await this.coursesRepository.finAllCourses();

    if (!courses) {
      throw new AppError('Courses does not exist')
    }

    return courses;
  }

}

export default CreateUserService;
