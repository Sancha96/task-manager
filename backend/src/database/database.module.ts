import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isDev = configService.get('NODE_ENV', 'development');
        return {
          type: configService.get<string>('DB_DIALECT', 'postgres') as any,
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
          migrationsRun: true,
          cli: {
            migrationsDir: `/${isDev ? 'src' : 'dist'}/migrations`,
          },
          synchronize: true,
          keepConnectionAlive: isDev,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
