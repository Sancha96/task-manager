import { IsString } from 'class-validator';

export class RefreshTokensDto {
  @IsString()
  refresh_token: string;
}
