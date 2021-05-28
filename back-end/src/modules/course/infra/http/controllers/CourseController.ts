import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { validate } from 'uuid';

import ListAllCoursesSerivce from '@modules/course/services/ListAllCoursesSerivce';
import ListCourseByIdSerivce from '@modules/course/services/ListCourseByIdSerivce';

export default class CourseController {
  public async findAll(request: Request, response: Response): Promise<Response> {
    const listAllCourses = container.resolve(ListAllCoursesSerivce);

    const courses = await listAllCourses.execute();

    return response.status(200).json(courses);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!validate(id)) {
      return response.status(400).json({ error: 'true', message: 'errou'});
    }

    const listCourseById = container.resolve(ListCourseByIdSerivce);

    const course = await listCourseById.execute(id);

    return response.status(200).json(course);
  }

}
