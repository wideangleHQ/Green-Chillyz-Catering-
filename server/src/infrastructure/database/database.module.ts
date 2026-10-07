import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * DatabaseModule provides PrismaService to the entire application.
 *
 * Marked @Global so that feature modules do not need to import it individually.
 * Only one Prisma connection pool is created for the application lifetime.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
