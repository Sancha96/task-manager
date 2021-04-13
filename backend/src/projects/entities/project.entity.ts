import {
  Column,
  Table,
  Model,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Person } from '../../persons/entities/person.entity';
import { ProjectPerson } from './project-person.entity';

@Table
export class Project extends Model<Project> {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  status: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @BelongsToMany(() => Person, () => ProjectPerson)
  persons: Person[];
}
