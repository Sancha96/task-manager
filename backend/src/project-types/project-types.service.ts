import { Injectable } from '@nestjs/common';
import { CreateProjectTypeDto } from './dto/create-project-type.dto';
import { UpdateProjectTypeDto } from './dto/update-project-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectType } from './entities/project-type.entity';

@Injectable()
export class ProjectTypesService {
  constructor(
    @InjectRepository(ProjectType)
    private readonly projectTypesRepository: Repository<ProjectType>,
  ) {}

  async create(createProjectTypeDto: CreateProjectTypeDto) {
    const type = await this.projectTypesRepository.create(createProjectTypeDto);

    return await this.projectTypesRepository.save(type);
  }

  async findAll() {
    return await this.projectTypesRepository.find({
      relations: ['stages'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} projectType`;
  }

  update(id: number, updateProjectTypeDto: UpdateProjectTypeDto) {
    return `This action updates a #${id} projectType`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectType`;
  }
}
