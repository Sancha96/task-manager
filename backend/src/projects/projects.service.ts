import { Inject, Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject('PROJECTS_REPOSITORY') private projectsRepository: typeof Project,
  ) {}

  async create(createProjectDto) {
    return await this.projectsRepository.create(createProjectDto);
  }

  async findAll() {
    return await this.projectsRepository.findAll<Project>();
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
