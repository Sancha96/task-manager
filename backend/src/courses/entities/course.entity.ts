import { Person } from '../../persons/entities/person.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column()
  name: string;

  @OneToMany(() => Person, (person) => person.course, {
    nullable: true,
  })
  students?: Person[];
}
