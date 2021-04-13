import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Project } from '../../projects/entities/project.entity';
import { ProjectPerson } from '../../projects/entities/project-person.entity';
import { User } from '../../users/entities/user.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Course } from '../../courses/entities/course.entity';

@Table
export class Person extends Model<Person> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  surName: string;

  @Column
  gender: string;

  @Column
  birthDate: Date;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Teacher)
  @Column
  teacherId: number;

  @BelongsTo(() => Teacher)
  teacher: Teacher;

  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @BelongsToMany(() => Project, () => ProjectPerson)
  projects: Project[];
}
