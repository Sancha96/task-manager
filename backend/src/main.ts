import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO: настроить корсы
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
