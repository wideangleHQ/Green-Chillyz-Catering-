import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { configuration } from './config';
import { DatabaseModule } from './infrastructure/database';
import { HealthModule } from './modules/health/health.module';
import { EnquiriesModule } from './modules/enquiries/enquiries.module';

/**
 * Root application module.
 *
 * Module composition:
 *   ConfigModule    — loads and validates environment variables
 *   ThrottlerModule — global rate limiting (anti-spam, DDoS mitigation)
 *   DatabaseModule  — global PrismaService (Supabase PostgreSQL via Prisma)
 *   HealthModule    — /api/v1/health endpoint (operational readiness)
 *   EnquiriesModule — POST /api/v1/enquiries, GET /api/v1/enquiries/ref/:referenceId
 *
 * Future domain modules to add here as they are implemented:
 *   CustomersModule, ServicesModule, GalleryModule,
 *   TestimonialsModule, FaqsModule, ContactModule, NotificationsModule
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      // Validate that required env vars are present at startup
      // Schema validation (with joi or zod) to be added in Phase 2
    }),

    ThrottlerModule.forRoot({
      // Default: 100 requests per 60 seconds per IP
      // Override per-route with @Throttle() decorator
      throttlers: [
        {
          ttl: parseInt(process.env.RATE_LIMIT_TTL ?? '60000', 10),
          limit: parseInt(process.env.RATE_LIMIT_MAX ?? '100', 10),
        },
      ],
    }),

    // Global — PrismaService available in all modules without re-importing
    DatabaseModule,

    HealthModule,
    EnquiriesModule,
  ],
})
export class AppModule {}
