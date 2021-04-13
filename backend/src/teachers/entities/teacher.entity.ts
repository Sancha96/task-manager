import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Person } from '../../persons/entities/person.entity';
import { Course } from '../../courses/entities/course.entity';

@Table
export class Teacher extends Model<Teacher> {
  @Column
  name: string;

  @ForeignKey(() => Course)
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @HasMany(() => Person)
  persons: Person[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}
