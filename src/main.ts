import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { validationOptions } from './validator/validator-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
