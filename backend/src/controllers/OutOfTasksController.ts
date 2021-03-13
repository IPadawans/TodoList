import { Request, Response } from 'express';
import CreateRandomTasksService from '../services/CreateRandomTasksService';

export default class OutOfTasksController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, name } = request.body;
    if (!email || !name) {
      return response.status(400).json({
        message: 'Missing params, be sure that you inform: email, name',
      });
    }

    const createRandomTasksService = new CreateRandomTasksService();
    try {
      const tasks = await createRandomTasksService.execute({ email, name });
      return response.json(tasks);
    } catch (e) {
      return response.status(404).json({ message: e.message });
    }
  }
}
