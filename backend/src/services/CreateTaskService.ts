import { getCustomRepository } from 'typeorm';
import { StatusOfTask } from '../enums/StatusOfTask';
import User from '../models/User';
import Task from '../models/Task';
import TasksRepository from '../repositories/TasksRepository';

interface Request {
  user: User;
  description: string;
}

class CreateTaskService {
  public async execute({ user, description }: Request): Promise<Task> {
    const tasksRepository = getCustomRepository(TasksRepository);
    const task = tasksRepository.create({
      user,
      description,
      status: StatusOfTask.TODO,
      concluded_count: 0,
    });

    await tasksRepository.save(task);

    return task;
  }
}

export default CreateTaskService;
