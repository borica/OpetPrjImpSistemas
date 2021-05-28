import { getRepository, Repository } from 'typeorm';

import ICoursesRepository from '@modules/course/repositories/ICoursesRepository';
import Course from '../entities/Course';

class CoursesRepository implements ICoursesRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async finAllCourses(): Promise<Course[]> {
    const corses = await this.ormRepository.find();

    return corses;
  }

  public async findById(id: string): Promise<Course | undefined> {
    const corse = await this.ormRepository.findOne({ where: { id } });

    return corse;
  }
}

export default CoursesRepository;
