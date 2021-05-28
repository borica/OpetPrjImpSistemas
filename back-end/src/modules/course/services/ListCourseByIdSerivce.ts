import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
class ListCourseByIdSerivce {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(id: string): Promise<Course> {
    const course = await this.coursesRepository.findById(id);

    if (!course) {
      throw new AppError('Courses does not exist')
    }

    return course;
  }

}

export default ListCourseByIdSerivce;
