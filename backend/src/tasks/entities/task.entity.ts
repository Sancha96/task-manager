import { Project } from 'src/projects/entities/project.entity';
import { Person } from '../../persons/entities/person.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Type } from 'class-transformer';

@Entity('tasks')
export class Task {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  complexity: number;

  @Column()
  estimatedTime: Date;

  @Column()
  actualTime: Date;

  @Column()
  status: string;

  @ManyToMany(() => Person, (person) => person.tasks)
  @JoinTable()
  executors: Person[];

  @Type(() => Project)
  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinTable()
  project: Project;
}
