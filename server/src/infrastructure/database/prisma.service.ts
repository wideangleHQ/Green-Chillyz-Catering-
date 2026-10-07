import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService wraps PrismaClient and integrates it with the NestJS lifecycle.
 *
 * Architecture position:
 *   NestJS Module → Service → PrismaService → Prisma Client → Supabase PostgreSQL
 *
 * Sensitive data (DATABASE_URL, credentials) is never logged.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log('Database connection established');
  }

  // NestJS calls shutdown hooks when the app exits; we close the Prisma
  // connection cleanly rather than waiting for the process to be killed.
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Database connection closed');
  }
}
