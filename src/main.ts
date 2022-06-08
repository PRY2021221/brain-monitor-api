import { LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/http-exception.filter';

const http = require('http');
const https = require('https');

async function bootstrap() {
  const logLevels: LogLevel[] =
    process.env.NODE_ENV === 'prod'
      ? ['error', 'warn']
      : ['error', 'log', 'warn', 'debug', 'verbose'];
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: logLevels,
  });
  app.use((req, res, next) => {
    const allowedOrigins = [
      'http://127.0.0.1:8020',
      'http://localhost:8020',
      'http://127.0.0.1:9000',
      'http://localhost:9000',
    ];
    const { origin } = req.headers;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    return next();
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalInterceptors(new SentryInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  setInterval(function () {
    if(process.env.NODE_ENV === 'prod') https.get(process.env.BASE_URL);
    else http.get(process.env.BASE_URL);
    console.log(`heroku wake up!!`);
  }, 300000); // every 5 minutes (300000)

  await app.listen(AppModule.port);
}
bootstrap();
