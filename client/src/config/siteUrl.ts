/**
 * Canonical public origin, used for metadataBase, canonical URLs and JSON-LD.
 *
 * Resolution order: NEXT_PUBLIC_SITE_URL (set this to the real domain) →
 * Vercel's production URL (system env, no protocol) → localhost in development.
 * Production never falls back to localhost.
 */
function resolve(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return 'http://localhost:3000';
}

export const SITE_URL = resolve().replace(/\/+$/, '');
