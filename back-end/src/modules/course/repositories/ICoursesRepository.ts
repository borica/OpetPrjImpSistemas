import Course from '../infra/typeorm/entities/Course';

export default interface ICoursesRepository {
    finAllCourses(): Promise<Course[]>;
    findById(id: string): Promise<Course | undefined>;
}