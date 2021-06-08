import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Stage } from '../../stages/entities/stage.entity';

@Entity('project-types')
export class ProjectType {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column()
  title: string;

  @OneToMany(() => Project, (project) => project.type)
  projects?: Project[];

  @OneToMany(() => Stage, (stage) => stage.type)
  stages?: Stage[];
}
