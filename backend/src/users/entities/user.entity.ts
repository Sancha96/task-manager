import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Exclude, Type } from 'class-transformer';

import * as bcrypt from 'bcrypt';

import { RefreshToken } from '../../auth/entities/refreshtoken.entity';
import { Person } from '../../persons/entities/person.entity';
import { Role } from '../../common/roles/role.enum';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: Role.Admin })
  roles: number;

  @OneToOne(() => Person, (person) => person.user)
  @JoinColumn()
  person: Person;

  @OneToMany(
    () => RefreshToken,
    (refreshToken: RefreshToken) => refreshToken.user,
  )
  refreshTokens: RefreshToken[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
