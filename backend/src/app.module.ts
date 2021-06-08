import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { PersonsModule } from './persons/persons.module';
import { CoursesModule } from './courses/courses.module';
import { TasksModule } from './tasks/tasks.module';
import { StagesModule } from './stages/stages.module';
import { SkillsModule } from './skills/skills.module';
import { ProjectTypesModule } from './project-types/project-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProjectsModule,
    PersonsModule,
    CoursesModule,
    TasksModule,
    StagesModule,
    SkillsModule,
    ProjectTypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
