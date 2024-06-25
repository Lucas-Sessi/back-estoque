import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Swagger } from './services/swagger/swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const swagger = new Swagger();
  swagger.setup(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || 3000, () => {
    Logger.log(
      `API running on http://localhost:${process.env.PORT || 3000}`,
      'Bootstrap',
    );
  });
}
bootstrap();
