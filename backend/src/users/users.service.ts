import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof User,
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findAll<User>();
    return this.users.find((user) => user.username === username);
  }

  async create(user: User): Promise<number | undefined> {
    const userId = user[user.length - 1].userId + 1;

    this.users.push({ ...user, userId });

    return userId;
  }

  async remove(uuid: string): Promise<void> {
    // await this.users.delete(uuid);
  }
}
