import axios, { AxiosResponse } from 'axios';
import { getCustomRepository } from 'typeorm';
import Task from '../models/Task';
import UsersRepository from '../repositories/UsersRepository';
import CreateTaskService from './CreateTaskService';
import CreateUsersService from './CreateUsersService';
import ValidateEmailService from './ValidateEmailService';

interface Request {
  name: string;
  email: string;
}

class CreateRandomTasksService {
  private catFactsApi;

  constructor() {
    this.catFactsApi = axios.create({
      baseURL: 'https://cat-fact.herokuapp.com',
    });
  }

  public async execute({ email, name }: Request): Promise<Task[] | null> {
    const usersRepository = getCustomRepository(UsersRepository);

    let user = await usersRepository.findByEmail(email);
    if (!user) {
      const validateEmailService = new ValidateEmailService();
      const { valid, did_you_mean } = await validateEmailService.execute({
        email,
      });

      if (!valid) {
        throw Error(did_you_mean);
      }

      const createUsersService = new CreateUsersService();
      user = await createUsersService.execute({ name, email });
    }

    const response = await (await this.catFactsApi.get('/facts')).data;

    const promisesTasks: Promise<Task>[] = [];
    const createTaskService = new CreateTaskService();

    for (let idx = 0; idx < 3; idx += 1) {
      const { text: taskDescription } = response[idx];
      promisesTasks.push(
        createTaskService.execute({ user, description: taskDescription }),
      );
    }

    const tasks: Task[] = [];
    await Promise.all(promisesTasks).then(values => tasks.push(...values));

    return tasks;
  }
}

export default CreateRandomTasksService;
