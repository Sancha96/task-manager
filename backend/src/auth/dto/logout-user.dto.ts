import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LogoutUserDto {
  @IsString()
  refresh_token: string;

  @Transform(({ value }) => value === 'true')
  @IsOptional()
  @IsBoolean()
  all: boolean;
}
