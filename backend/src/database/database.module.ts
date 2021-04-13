import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { Person } from '../persons/entities/person.entity';
import { ProjectPerson } from '../projects/entities/project-person.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { Course } from '../courses/entities/course.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          dialect: 'postgres',
          host: config.get('DB_HOST'),
          port: +config.get<number>('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get<string>('DB_DATABASE'),
          models: [User, Project, Person, ProjectPerson, Teacher, Course],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
