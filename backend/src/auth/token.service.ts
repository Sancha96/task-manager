import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import { RefreshToken } from './entities/refreshtoken.entity';

import { UsersService } from '../users/users.service';

import { LoginRoDto } from './dto/login-ro.dto';

import { JwtPayload } from './jwt-payload';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async getAccessTokenFromRefreshToken(
    oldRefreshToken: string,
    ipAddress: string,
  ): Promise<LoginRoDto> {
    try {
      const token = await this.refreshTokenRepository.findOne({
        token: oldRefreshToken,
      });

      if (!token) {
        throw new NotFoundException('Refresh token not found');
      }

      if (new Date(token.expiresIn) < new Date()) {
        throw new UnauthorizedException('Refresh token expired');
      }

      const user = await this.usersService.findOne(token.userUuid);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const accessToken = await this.createAccessToken({
        sub: token.userUuid,
        roles: user.roles,
        username: user.username,
      });

      await this.refreshTokenRepository.delete(token.uuid);

      const refreshToken = await this.createRefreshToken({
        userUuid: token.userUuid,
        ipAddress,
      });

      return { uuid: user.uuid, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async createAccessToken(payload: JwtPayload): Promise<string> {
    const signedPayload = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('EXPIRES_IN'),
      secret: this.configService.get('SECRET_KEY'),
    });

    return signedPayload;
  }

  async createRefreshToken({
    userUuid,
    ipAddress,
  }: {
    userUuid: string;
    ipAddress: string;
  }): Promise<string> {
    const token = nanoid(64).toString();
    const refreshExpiresIn = this.configService.get('REFRESH_EXPIRES_IN');
    const refreshToken = this.refreshTokenRepository.create({
      userUuid: userUuid,
      token,
      ipAddress,
      expiresIn: dayjs().add(
        +refreshExpiresIn.match(/\d+/g)[0],
        refreshExpiresIn.match(/[a-zA-Z]+/g)[0],
      ),
    });

    await this.refreshTokenRepository.save(refreshToken);

    return token;
  }

  async deleteRefreshToken(refreshToken: string) {
    await this.refreshTokenRepository.delete({ token: refreshToken });
  }

  async deleteRefreshTokens(accessToken: string) {
    const { sub } = await this.validateToken(accessToken, true);

    await this.refreshTokenRepository.delete({ userUuid: sub });
  }

  private async validateToken(
    token: string,
    ignoreExpiration = false,
  ): Promise<JwtPayload> {
    return this.jwtService.verify(token, {
      secret: this.configService.get('SECRET_KEY'),
      ignoreExpiration,
    });
  }
}
