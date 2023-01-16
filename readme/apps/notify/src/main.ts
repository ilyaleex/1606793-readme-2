/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APIConfig, getAppRunningString, Path, Port, Prefix } from '@readme/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = Prefix.Global;

  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle(APIConfig.NotifyTitle)
    .setDescription(APIConfig.NotifyDesc)
    .setVersion(APIConfig.Version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Path.Spec, app, document)

  const port = process.env.API_PORT || Port.NotifyAPIDefault;

  await app.listen(port);

  Logger.log(
    getAppRunningString(APIConfig.NotifyTitle, port)
  );
}

bootstrap();
