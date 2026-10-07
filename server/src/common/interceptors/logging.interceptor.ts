import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable, tap } from 'rxjs';

/**
 * Request logging interceptor.
 *
 * Logs: method, path, status, and duration for every request.
 * Does NOT log request bodies, query params, or headers to avoid
 * accidentally leaking PII (phone numbers, email addresses).
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        const statusCode = context
          .switchToHttp()
          .getResponse<{ statusCode: number }>().statusCode;
        this.logger.log(`${method} ${url} ${statusCode} +${duration}ms`);
      }),
    );
  }
}
