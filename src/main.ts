import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import config from 'config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get<{ port: number }>('server');
  const port = serverConfig.port;

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}

bootstrap();
