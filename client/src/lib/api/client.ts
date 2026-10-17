import type { ApiError } from '@/types';

// Base URL is set at build time via NEXT_PUBLIC_API_URL.
// Server Components call this from Node.js; Client Components call it from the browser.
// Both resolve to the NestJS server running at /api/v1.
// localhost is a development-only fallback: a production build without
// NEXT_PUBLIC_API_URL must fail loudly rather than call the visitor's machine.
const BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000/api/v1')
).replace(/\/+$/, '');

const REQUEST_TIMEOUT_MS = 15_000;
const GENERIC_ERROR = 'Something went wrong. Please try again.';

export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiError,
  ) {
    super(body.message);
    this.name = 'ApiRequestError';
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  // Next.js fetch cache options
  revalidate?: number | false;
  tags?: string[];
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, revalidate, tags, headers: extraHeaders, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(extraHeaders as Record<string, string>),
  };

  const nextOptions = revalidate !== undefined || tags ? { next: { revalidate, tags } } : {};

  if (!BASE_URL) {
    throw new ApiRequestError(0, { statusCode: 0, message: GENERIC_ERROR, timestamp: '', path });
  }

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      ...fetchOptions,
      ...nextOptions,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    // Network failure or timeout — never surface the raw error to users.
    throw new ApiRequestError(0, { statusCode: 0, message: GENERIC_ERROR, timestamp: '', path });
  }

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as ApiError | null;
    // Only 4xx messages (validation, rate limit) are meant for users; hide 5xx detail.
    const message =
      response.status < 500 && typeof error?.message === 'string' ? error.message : GENERIC_ERROR;
    throw new ApiRequestError(response.status, {
      statusCode: response.status,
      message,
      timestamp: error?.timestamp ?? '',
      path: error?.path ?? path,
    });
  }

  // 204 No Content
  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'GET' }),

  post: <T>(path: string, body: unknown, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'POST', body }),

  patch: <T>(path: string, body: unknown, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'PATCH', body }),

  delete: <T>(path: string, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};
