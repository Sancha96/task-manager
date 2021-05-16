import { Person } from '../../persons/entities/person.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Type } from 'class-transformer';

@Entity('courses')
export class Course {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string;

  @Column()
  name: string;

  @ManyToMany(() => Teacher, (teacher) => teacher.courses, {
    nullable: true,
  })
  @JoinTable()
  teachers?: Teacher[];

  @Type(() => Person)
  @OneToMany(() => Person, (person) => person.course, {
    nullable: true,
  })
  @JoinTable()
  persons?: Person[];
}
