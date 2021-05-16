import { Person } from '../../persons/entities/person.entity';
import { Course } from '../../courses/entities/course.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Type } from 'class-transformer';

@Entity('teachers')
export class Teacher {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string;

  @Column()
  name: string;

  @Column({ type: 'uuid' })
  courseUuid: string;

  @ManyToMany(() => Course, (course) => course.teachers, {
    nullable: true,
  })
  @JoinTable()
  courses?: Course;
}
