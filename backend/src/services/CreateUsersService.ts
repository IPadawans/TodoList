import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
}

class CreateUsersService {
  public async execute({ name, email }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUsersService;
