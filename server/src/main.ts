import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

/**
 * Application bootstrap.
 *
 * Security and middleware applied globally:
 *   - Helmet         — sets secure HTTP headers
 *   - CORS           — restricts cross-origin requests to known origins
 *   - ValidationPipe — class-validator DTO validation, strips unknown fields
 *   - ExceptionFilter — consistent JSON error responses, no stack leaks
 *   - LoggingInterceptor — request/response logging without PII exposure
 *
 * API versioning:  all routes are prefixed /api/v1
 * Shutdown hooks:  enabled for clean Prisma disconnect on SIGTERM
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    // Suppress NestJS startup banner in production
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn', 'log']
        : ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Enable shutdown hooks so PrismaService.onModuleDestroy() fires on SIGTERM
  app.enableShutdownHooks();

  // Secure HTTP headers
  app.use(helmet());

  // CORS — origins are configured via CORS_ORIGINS env var (comma-separated)
  const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim());

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global API prefix — all endpoints are reachable at /api/v1/*
  app.setGlobalPrefix('api/v1');

  // Validate incoming DTOs; strip any properties not declared in the DTO class
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip undeclared fields
      forbidNonWhitelisted: false, // Do not throw on extra fields (strip silently)
      transform: true, // Auto-transform plain objects to DTO class instances
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Consistent error shape for all HTTP exceptions
  app.useGlobalFilters(new HttpExceptionFilter());

  // Request/response logging (method, path, status, duration — no PII)
  app.useGlobalInterceptors(new LoggingInterceptor());

  const port = parseInt(process.env.PORT ?? '4000', 10);
  await app.listen(port);

  console.log(
    `\n🟢 Green Chillyz Catering API running on: http://localhost:${port}/api/v1`,
  );
  console.log(`   Health check: http://localhost:${port}/api/v1/health\n`);
}

bootstrap().catch((err: unknown) => {
  console.error('Fatal bootstrap error:', err);
  process.exit(1);
});
