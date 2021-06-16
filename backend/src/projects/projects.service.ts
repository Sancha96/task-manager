import { Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Task } from '../tasks/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePersonDto } from '../persons/dto/create-person.dto';
import { Person } from '../persons/entities/person.entity';
import { UpdateTaskDto } from '../tasks/dto/update-task.dto';
import { Skill } from '../skills/entities/skill.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Person)
    private readonly personsRepository: Repository<Person>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Task>,
  ) {}

  async create(createPersonDto: any) {
    const executors = await this.personsRepository.find({
      where: {
        uuid: In(createPersonDto.executors),
      },
      order: {
        lastName: 'ASC',
      },
    });
    createPersonDto.executors = executors;
    const skills = await this.skillsRepository.find({
      where: {
        uuid: In(createPersonDto.skills),
      },
    });
    createPersonDto.skills = skills;

    const project = await this.projectsRepository.create(createPersonDto);

    return await this.projectsRepository.save(project);
  }

  async findAll(options) {
    if (options?.executor) {
      const person: any = await this.personsRepository.findOne({
        where: {
          uuid: options.executor,
        },
        relations: [
          'projects',
          'projects.executors',
          'projects.teacher',
          'projects.skills',
        ],
      });
      const projectIds = person.projects.map((project) => project.uuid);
      const tasks: any = await this.tasksRepository.find({
        relations: ['project'],
        where: {
          project: In(projectIds),
        },
      });
      person.projects.forEach(
        (project) =>
          (project.tasks = tasks.filter(
            (task) => task.project.uuid === project.uuid,
          )),
      );

      person.projects.forEach((project) => {
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

      return person.projects;
    }

    if (options?.teacher) {
      const projects: any = await this.projectsRepository.find({
        relations: ['executors', 'teacher', 'skills'],
        where: {
          teacher: options.teacher,
        },
      });
      const projectIds = projects.map((project) => project.uuid);
      const tasks: any = await this.tasksRepository.find({
        relations: ['project'],
        where: {
          project: In(projectIds),
        },
      });
      projects.forEach(
        (project) =>
          (project.tasks = tasks.filter(
            (task) => task.project.uuid === project.uuid,
          )),
      );

      projects.forEach((project) => {
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
