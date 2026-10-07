import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

/**
 * Global HTTP exception filter.
 *
 * Produces a consistent JSON error shape for all HTTP exceptions:
 *   { statusCode, message, timestamp, path }
 *
 * Internal server errors (5xx) do not expose stack traces or internal
 * messages to the client — only a generic "Internal server error" message
 * is returned.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const statusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // Never leak internal server error details to the client
    const clientMessage =
      statusCode >= 500
        ? 'Internal server error'
        : isHttpException
          ? (exception.getResponse() as { message?: string } | string)
          : 'An unexpected error occurred';

    const errorBody = {
      statusCode,
      message:
        typeof clientMessage === 'object' && clientMessage !== null
          ? ((clientMessage as { message?: string }).message ?? clientMessage)
          : clientMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Log 5xx errors with full details server-side; 4xx are informational only
    if (statusCode >= 500) {
      this.logger.error(
        `${request.method} ${request.url} → ${statusCode}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(`${request.method} ${request.url} → ${statusCode}`);
    }

    response.status(statusCode).json(errorBody);
  }
}
