import {
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Project } from './project.entity';
import { Person } from '../../persons/entities/person.entity';

@Table
export class ProjectPerson extends Model {
  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @ForeignKey(() => Person)
  @Column
  personId: number;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}
