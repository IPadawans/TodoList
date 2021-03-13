import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { classToClass } from 'class-transformer';
import { StatusOfTask } from '../enums/StatusOfTask';
import UsersRepository from '../repositories/UsersRepository';
import TasksRepository from '../repositories/TasksRepository';
import CreateUsersService from '../services/CreateUsersService';
import CreateTaskService from '../services/CreateTaskService';
import UpdateStatusTaskService from '../services/UpdateStatusTaskService';
import ValidateEmailService from '../services/ValidateEmailService';

export default class TasksController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, description } = request.body;
    if (!name || !email || !description) {
      return response.status(400).json({
        message:
          'Missing params, be sure that you inform: email, name, description',
      });
    }
    const usersRepository = getCustomRepository(UsersRepository);

    let user = await usersRepository.findByEmail(email);
    if (!user) {
      const validateEmailService = new ValidateEmailService();
      const { valid, did_you_mean } = await validateEmailService.execute({
        email,
      });

      if (!valid) {
        return response.status(404).json({
          message: `Invalid e-mail, did_you_mean: ${did_you_mean}`,
        });
      }

      const createUsersService = new CreateUsersService();
      user = await createUsersService.execute({ name, email });
    }

    const createTaskService = new CreateTaskService();
    const task = await createTaskService.execute({ user, description });
    return response.json(classToClass(task));
  }

  async list(request: Request, response: Response): Promise<Response> {
    const { status } = request.query;
    const tasksRepository = getCustomRepository(TasksRepository);
    const filtersAndRelations = status
      ? { relations: ['user'], where: { status } }
      : { relations: ['user'] };
    const tasks = await tasksRepository.find(filtersAndRelations);
    return response.json(classToClass(tasks));
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { task_id } = request.params;
    const tasksRepository = getCustomRepository(TasksRepository);
    const task = await tasksRepository.findOne({
      where: { id: task_id },
      relations: ['user'],
    });
    if (!task) {
      return response.status(404).json({ message: 'Task not found' });
    }

    return response.json(classToClass(task));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { task_id } = request.params;
    const { password, status } = request.body;
    if (!status || !Object.values(StatusOfTask).includes(status)) {
      return response
        .status(404)
        .json({ message: 'Bad status value, should be: TODO, CONCLUDED' });
    }

    const updateStatusTaskService = new UpdateStatusTaskService();
    try {
      const task = await updateStatusTaskService.execute({
        taskId: task_id,
        status,
        supervisorPassword: password,
      });
      return response.json(classToClass(task));
    } catch (e) {
      return response.status(404).json({ message: e.message });
    }
  }
}
