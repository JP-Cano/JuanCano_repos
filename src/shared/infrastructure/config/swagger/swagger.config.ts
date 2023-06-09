import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = async (
  app: INestApplication,
  environment: string,
) => {
  if (environment !== 'development') {
    return;
  }

  const documentBuilder = new DocumentBuilder()
    .setTitle('Backend challenge')
    .setDescription('NestJs backend developer challenge')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup('/', app, document);
};
