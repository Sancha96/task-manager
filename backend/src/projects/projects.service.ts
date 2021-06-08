import { Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import { CreatePersonDto } from '../persons/dto/create-person.dto';
import { Person } from '../persons/entities/person.entity';
import {UpdateTaskDto} from "../tasks/dto/update-task.dto";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Person)
    private readonly personsRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: any) {
    const executors = await this.personsRepository.find({
      where: {
        uuid: In(createPersonDto.executors),
      },
    });
    createPersonDto.executors = executors;
    const project = await this.projectsRepository.create(createPersonDto);

    return await this.projectsRepository.save(project);
  }

  async findAll(options) {
    if (options?.executor) {
      const person: any = await this.personsRepository.findOne({
        relations: ['projects', 'projects.executors', 'projects.teacher'],
        where: {
          uuid: options.executor,
        },
      });
      return person.projects;
    }

    if (options?.teacher) {
      const projects: any = await this.projectsRepository.find({
        relations: ['executors', 'teacher'],
        where: {
          teacher: options.teacher,
        },
      });

      return projects;
    }

    return await this.projectsRepository.find(options);
  }

  async getProjectsByStatus(status) {
    if (!status) throw new Error('Тип не передан');
    return await this.projectsRepository.find({
      where: { status },
    });
  }

  async updateStatusProject(uuid, status) {
    if (!uuid && !status) throw new Error('Нет uuid');

    try {
      return await this.projectsRepository.update({ uuid }, { status });
    } catch (e) {
      return 'Не получилось обновить статус';
    }
  }

  async findOne(id: string) {
    const project: any = await this.projectsRepository.findOne(id, {
      relations: ['type'],
    });
    return project;
  }

  async update(uuid: string, updateProjectDto: UpdateProjectDto) {
    const property = await this.projectsRepository.findOne({
      where: { uuid },
    });

    return this.projectsRepository.save({
      ...property,
      ...updateProjectDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
