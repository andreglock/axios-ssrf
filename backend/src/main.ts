import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'warn'],
  });
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);

  Logger.debug(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
