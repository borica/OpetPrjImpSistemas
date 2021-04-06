import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllCoursesSerivce from '@modules/course/services/ListAllCoursesSerivce';

export default class CourseController {
  public async findAll(request: Request, response: Response): Promise<Response> {
    const listAllCourses = container.resolve(ListAllCoursesSerivce);

    const courses = await listAllCourses.execute();

    return response.status(200).json(courses);
  }
}
