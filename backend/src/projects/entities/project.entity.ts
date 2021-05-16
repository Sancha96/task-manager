import { Person } from '../../persons/entities/person.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { Task } from '../../tasks/entities/task.entity';

@Entity('projects')
export class Project {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'backLog' })
  status: string;

  @Type(() => Person)
  @ManyToMany(() => Person, (person) => person.projects)
  @JoinTable()
  persons: Person[];

  @Type(() => Task)
  @OneToMany(() => Task, (task) => task.project)
  @JoinTable()
  tasks: Task;
}
