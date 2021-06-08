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
import { Stage } from '../../stages/entities/stage.entity';

@Entity('tasks')
export class Task {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  complexity?: number;

  @Column({ nullable: true })
  estimatedTime?: Date;

  @Column({ nullable: true })
  actualTime?: Date;

  @Column({ default: 'backlog' })
  status: string;

  @Column({ default: false })
  isConfirmed: boolean;

  @ManyToMany(() => Person, (person) => person.tasks)
  @JoinTable()
  executors: Person[];

  @ManyToOne(() => Stage)
  stage: Stage;

  @ManyToOne(() => Project)
  project: Project;
}
