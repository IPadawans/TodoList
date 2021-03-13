import { getCustomRepository } from 'typeorm';
import { StatusOfTask } from '../enums/StatusOfTask';
import Task from '../models/Task';
import TasksRepository from '../repositories/TasksRepository';

interface Request {
  taskId: string;
  status: StatusOfTask;
  supervisorPassword: string;
}

class UpdateStatusTaskService {
  public async execute({
    taskId,
    status,
    supervisorPassword,
  }: Request): Promise<Task> {
    const tasksRepository = getCustomRepository(TasksRepository);
    const existentTask = await tasksRepository.findOne({
      where: { id: taskId },
    });

    if (!existentTask) {
      throw Error('Task does not exists');
    }

    if (status === existentTask.status) {
      throw Error('Nothig to update');
    }
    const concludedCount = Number(existentTask.concluded_count);
    if (concludedCount >= 2 && status === StatusOfTask.TODO) {
      throw Error('Exceed number of times status changing to TODO');
    }

    if (status === StatusOfTask.TODO && !supervisorPassword) {
      throw Error('Missing supervisorPassword for action');
    }

    if (supervisorPassword && supervisorPassword !== 'TrabalheNaSaipos') {
      throw Error('Wrong password');
    }

    existentTask.status = status;
    if (status === StatusOfTask.TODO) {
      existentTask.concluded_count = concludedCount + 1;
    } else {
      existentTask.concluded_count = concludedCount;
    }

    await tasksRepository.save(existentTask);

    return existentTask;
  }
}

export default UpdateStatusTaskService;
