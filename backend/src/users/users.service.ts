import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { PaginationParams } from '../common/pagination/pagination-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(user);
  }

  findAndCount(paginationParams: PaginationParams): Promise<[User[], number]> {
    return this.usersRepository.findAndCount({ ...paginationParams });
  }

  async findOne(uuid: string): Promise<User> {
    const user = await this.usersRepository.findOne(uuid, {
      relations: ['person'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(uuid, updateUserDto);

    return this.findOne(uuid);
  }

  async remove(uuid: string): Promise<void> {
    await this.usersRepository.delete(uuid);
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    return await this.usersRepository.findOne({
      username: loginUserDto.username,
    });
  }
}
