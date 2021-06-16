import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Person } from '../persons/entities/person.entity';
import { Task } from '../tasks/entities/task.entity';
import { Skill } from '../skills/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Person, Task, Skill])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}
