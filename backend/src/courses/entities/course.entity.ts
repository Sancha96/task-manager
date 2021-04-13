import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  Column,
} from 'sequelize-typescript';
import { Person } from '../../persons/entities/person.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';

@Table
export class Course extends Model<Course> {
  @Column
  name: string;

  @HasMany(() => Teacher)
  teachers: number;

  @HasMany(() => Person)
  persons: Person[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}
