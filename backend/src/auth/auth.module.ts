import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';

import { RefreshToken } from './entities/refreshtoken.entity';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get('EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy, TokenService],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
