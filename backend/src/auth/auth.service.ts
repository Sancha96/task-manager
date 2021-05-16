import { Injectable } from '@nestjs/common';

import { TokenService } from './token.service';
import { UsersService } from '../users/users.service';

import { LoginRoDto } from './dto/login-ro.dto';

import { LoginUserDto } from './dto/login-user.dto';

import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(
    loginUserDto: LoginUserDto,
    ipAddress: string,
  ): Promise<LoginRoDto> {
    const user = await this.usersService.login(loginUserDto);

    if (!user) {
      return null;
    }

    if (!(await user.comparePassword(loginUserDto.password))) {
      return null;
    }

    const accessToken = await this.tokenService.createAccessToken({
      sub: String(user.uuid),
      roles: user.roles,
      username: user.username,
    });
    const refreshToken = await this.tokenService.createRefreshToken({
      userUuid: String(user.uuid),
      ipAddress,
    });

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string): Promise<any> {
    await this.tokenService.deleteRefreshToken(refreshToken);
  }

  async logoutAll(accessToken: string): Promise<any> {
    await this.tokenService.deleteRefreshTokens(accessToken);
  }

  async validatePayload({ sub, roles, username }: JwtPayload): Promise<any> {
    const user = await this.usersService.findOne(sub);

    if (!user) {
      return null;
    }

    return {
      uuid: sub,
      roles,
      username,
    };
  }
}
