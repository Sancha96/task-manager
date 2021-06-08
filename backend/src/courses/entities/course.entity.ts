import { Person } from '../../persons/entities/person.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string;

  @Column()
  name: string;

  @ManyToMany(() => Person)
  @JoinTable()
  teachers?: Person[];

  @OneToMany(() => Person, (person) => person.course, {
    nullable: true,
  })
  students?: Person[];
}
