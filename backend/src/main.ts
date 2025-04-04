import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NextFunction, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'warn', 'log', 'verbose'],
  });
  app.setGlobalPrefix('api');
  app.enableCors();

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Frame-Options', 'deny');
    res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload',
    );
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    res.removeHeader('X-Powered-By');
    next();
  });

  await app.listen(process.env.PORT ?? 3000);

  Logger.debug(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().then(() => {
  Logger.log(`App launched successfully`);
});
