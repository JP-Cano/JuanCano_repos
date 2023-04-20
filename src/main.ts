import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverConfig } from './shared/infrastructure/config/server/server.config';
import { swaggerConfig } from './shared/infrastructure/config/swagger/swagger.config';

async function bootstrap() {
  const appServerConfig = serverConfig();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await swaggerConfig(app, appServerConfig.environment);

  await app.listen(3000, () => {
    Logger.log('Open server on: http://localhost:3000');
    Logger.log(`To health check visit http://localhost:3000/check`);
  });
}

bootstrap().then();
