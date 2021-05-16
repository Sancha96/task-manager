import { IsEmail, IsNumber, IsString, IsUUID, Validate } from 'class-validator';

import { Unique } from '../../database/unique';

import { User } from '../entities/user.entity';

export class UserRoDto {
  @IsUUID()
  uuid: string;

  @IsString()
  @Validate(Unique, [User])
  username: string;

  @IsEmail()
  @Validate(Unique, [User])
  email: string;

  @IsNumber()
  roles: number;
}
