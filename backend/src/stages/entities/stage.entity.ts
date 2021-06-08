import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProjectType } from '../../project-types/entities/project-type.entity';

@Entity('stages')
export class Stage {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  endDate: Date;

  @Column({ default: 'backLog' })
  status: string;

  @ManyToOne(() => ProjectType)
  type?: ProjectType;
}
