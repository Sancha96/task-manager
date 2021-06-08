import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column()
  title: string;
}
