import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database';

/**
 * Health check endpoint: GET /api/v1/health
 *
 * Returns the application status and database connectivity.
 * Used by monitoring systems, load balancers, and CI/CD pipelines.
 *
 * Intentionally kept simple — no authentication required.
 * Does NOT expose any business data.
 */
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check(): Promise<{
    status: string;
    database: string;
    timestamp: string;
    version: string;
  }> {
    let dbStatus = 'ok';

    try {
      // Lightweight connectivity check — a raw query that returns immediately
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      dbStatus = 'unreachable';
    }

    return {
      status: 'ok',
      database: dbStatus,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? '0.0.1',
    };
  }
}
