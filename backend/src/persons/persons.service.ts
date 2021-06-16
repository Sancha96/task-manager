import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, In } from 'typeorm';
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
      .execute();
    return asd;
  }

  async create(createPersonDto: CreatePersonDto) {
    const person = await this.personsRepository.create(createPersonDto);

    return await this.personsRepository.save(person);
  }

  async findAll(params: any) {
    if (params.type) {
      const persons = await this.personsRepository.find({
        relations: ['projects', 'projects.teacher', 'user'],
        where: { type: params.type },
        order: {
          lastName: 'ASC',
        },
      });

      const projectIds = [];
      persons.map((person) =>
        person.projects.map((project) => projectIds.push(project.uuid)),
      );
      const tasks: any = await this.tasksRepository.find({
        relations: ['project'],
        where: {
          project: In(projectIds),
        },
      });

      persons.map((person: any) => {
        person.projects.forEach(
          (project: any) =>
            (project.tasks = tasks.filter(
              (task) => task.project.uuid === project.uuid,
            )),
        );
      });

      persons.map((person: any) => {
        person.projects.forEach((project: any) => {
          const tasksCount = project.tasks.length;
          const confirmedCount = [];
          tasksCount &&
            project.tasks.forEach(
              ({ isConfirmed }) => isConfirmed && confirmedCount.push(true),
            );

          project.progress = Number(
            ((confirmedCount?.length / tasksCount || 0) * 100).toFixed(2),
          );
        });
      });

      return persons;
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
