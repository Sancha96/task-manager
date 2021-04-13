import {
  Column,
  Table,
  Model,
  HasOne,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Person } from '../../persons/entities/person.entity';

@Table
export class User extends Model<User> {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @HasOne(() => Person)
  person: Person;
}
