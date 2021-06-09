import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Person } from '../persons/entities/person.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(Person)
    private readonly personsRepository: Repository<Person>,
  ) {}

  async create(createTaskDto: any) {
    const executors = await this.personsRepository.find({
      where: {
        uuid: In(createTaskDto.executors),
      },
    });
    createTaskDto.executors = executors;
    const task = await this.tasksRepository.create(createTaskDto);

    return await this.tasksRepository.save(task);
  }

  findAll(query: any) {
    return this.tasksRepository.find({
      relations: ['stage', 'project', 'executors'],
      where: {
        stage: query.stage,
        project: query.project,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(uuid: string, otherProp) {
    const property = await this.tasksRepository.findOne({
      where: { uuid },
    });

    if (property.status !== otherProp.status) {
      if (otherProp.status === 'inprogress') {
        otherProp.startTime = new Date();
      }

      if (otherProp.status === 'paused') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        property.actualTime = new Date() - property.startTime;
        otherProp.startTime = null;
      }

      console.log(otherProp);
      return this.tasksRepository.save({
        ...property,
        ...otherProp,
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
