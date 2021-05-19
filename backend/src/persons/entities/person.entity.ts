import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';

@Entity('persons')
export class Person {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column({ default: 'test' })
  firstName: string;

  @Column({ default: 'test' })
  lastName: string;

  @Column({ nullable: true })
  surName: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  type: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Course, (course) => course.persons, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  course?: Course;

  @ManyToMany(() => Task, (task) => task.executors)
  @JoinTable()
  tasks?: Task[];
}
