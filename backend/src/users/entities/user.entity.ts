import { Column, Table, Model } from 'sequelize-typescript';
import { Role } from 'src/roles/role.enum';

@Table
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  password: string;

  // @Column
  // roles: Role[];
}
