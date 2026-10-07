/**
 * Application configuration factory.
 *
 * Values are read from environment variables at startup.
 * No secrets are embedded in code — all sensitive values come from .env.
 *
 * Database URLs are consumed only by Prisma; they are NOT forwarded to the
 * frontend and must NOT be prefixed with NEXT_PUBLIC_.
 */
export default () => ({
  app: {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '4000', 10),
  },

  cors: {
    // Comma-separated list of allowed origins (e.g. http://localhost:3000)
    origins: (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
      .split(',')
      .map((o) => o.trim()),
  },

  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL ?? '60', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX ?? '100', 10),
  },

  // DATABASE_URL and DIRECT_URL are read directly by Prisma via env() in
  // schema.prisma and are not re-exposed through this config object.
});
