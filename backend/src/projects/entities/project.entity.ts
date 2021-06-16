import { Person } from '../../persons/entities/person.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Skill } from '../../skills/entities/skill.entity';
import { ProjectType } from '../../project-types/entities/project-type.entity';

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

  @ManyToMany(() => Person, (person) => person.projects)
  @JoinTable()
  executors: Person[];

  @ManyToOne(() => Person)
  teacher?: Person;

  @ManyToOne(() => ProjectType, (projectType) => projectType.projects)
  type?: ProjectType;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];
}
