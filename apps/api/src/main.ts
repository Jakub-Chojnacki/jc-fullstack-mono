import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { toNodeHandler } from 'better-auth/node';
import * as cookieParser from 'cookie-parser';
import type { Express } from 'express';
import { json } from 'express';
import helmet from 'helmet';

import { AuthService } from '@mguay/nestjs-better-auth';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // required so Better Auth can read the raw request body
  });
  const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim());

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  app.use(helmet());
  app.use(cookieParser());
  const expressApp = app.getHttpAdapter().getInstance() as Express;

  // Access BetterAuth instance from AuthService
  const authService = app.get<AuthService>(AuthService);

  expressApp.all(
    /^\/api\/auth\/.*/,
    toNodeHandler(authService.instance.handler),
  );
  expressApp.use(json());

  const config = new DocumentBuilder()
    .setTitle('Food Planner API')
    .setDescription('The Food Planner API description')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
