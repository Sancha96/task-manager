import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll<User>();
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({
      where: { email: username },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Возможно, как-то можно обойтись без переприсваивания каждого свойства,
    // но компилятор ругается, что в CreateUserDto перечислены не все свойства модели User
    // Наследоваться в CreateUserDto от User тоже поди неправильно
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return user.save();
  }

  async update(updateUserDto: UpdateUserDto) {
    // аналогичная ситуация с UpdateUserDto
    // return await this.userModel.update(updateUserDto);
  }

  // async remove(id: string): Promise<void> {
  //   // await this.usersRepository.remove(+id);
  // }
}
