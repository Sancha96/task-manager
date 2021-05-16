import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column()
  userUuid: string;

  @Column()
  ipAddress: string;

  @Column()
  token: string;

  @Column('date')
  expiresIn: Date;

  @ManyToOne(() => User, (user: User) => user.refreshTokens, {
    onDelete: 'CASCADE',
  })
  user: User;
}
