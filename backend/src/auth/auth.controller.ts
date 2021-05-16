import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ExtractJwt } from 'passport-jwt';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

import { LoginRoDto } from './dto/login-ro.dto';

import { LoginUserDto } from './dto/login-user.dto';
import { LogoutUserDto } from './dto/logout-user.dto';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Ip() userIp: string,
    @Body(new ValidationPipe()) loginUserDto: LoginUserDto,
  ): Promise<LoginRoDto> {
    const loginResults = await this.authService.login(loginUserDto, userIp);

    if (!loginResults) {
      throw new UnauthorizedException(
        'Authentication failed due to incorrect username or password.',
      );
    }

    return loginResults;
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  public async refreshTokens(
    @Ip() userIp: string,
    @Body(new ValidationPipe()) refreshTokens: RefreshTokensDto,
  ): Promise<LoginRoDto> {
    return this.tokenService.getAccessTokenFromRefreshToken(
      refreshTokens.refresh_token,
      userIp,
    );
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async logout(
    @Req() req,
    @Body(new ValidationPipe()) { all, refresh_token }: LogoutUserDto,
  ): Promise<void> {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    if (all) {
      await this.authService.logoutAll(accessToken);
    } else {
      if (!refresh_token) {
        throw new BadRequestException('No refresh token provided');
      }

      await this.authService.logout(refresh_token);
    }
  }
}
