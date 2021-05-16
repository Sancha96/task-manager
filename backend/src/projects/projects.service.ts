import { Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from '../persons/dto/create-person.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const project = await this.projectsRepository.create(createPersonDto);

    return await this.projectsRepository.save(project);
  }

  async findAll() {
    return await this.projectsRepository.find();
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

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
