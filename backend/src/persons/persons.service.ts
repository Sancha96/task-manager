import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
// import { Task } from '../tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personsRepository: Repository<Person>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async getDataForDashboard(params: any) {
    const asd = await getConnection()
      .createQueryBuilder()
      .select('*')
      .from(Person, 'persons')
      .where('persons.deletedAt IS NULL')
      .andWhere('persons.type = :type', { type: 'student' })
      // .leftJoin()
      .execute();
    console.log(asd);
    return asd;
  }

  async create(createPersonDto: CreatePersonDto) {
    const person = await this.personsRepository.create(createPersonDto);

    return await this.personsRepository.save(person);
  }

  async findAll(params: any) {
    if (params.type) {
      return await this.personsRepository.find({
        where: { type: params.type },
      });
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  async remove(uuid: string) {
    if (uuid) {
      const entity = await this.personsRepository.findOne({ where: { uuid } });
      const data = {
        deletedAt: new Date(),
      };
      try {
        await this.personsRepository.update(entity, data);
        return 'Пользователь успешно удален';
      } catch (err) {
        //needs logs
        //получение студентов[] по курсу
        //поля название проекта(активных)
        return 'Не получилось удалить пользователя';
      }
    }
  }
}
