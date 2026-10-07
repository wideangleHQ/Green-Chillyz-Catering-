import type { ApiError } from '@/types';

// Base URL is set at build time via NEXT_PUBLIC_API_URL.
// Server Components call this from Node.js; Client Components call it from the browser.
// Both resolve to the NestJS server running at /api/v1.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

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

  const response = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    ...nextOptions,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = (await response.json()) as ApiError;
    throw new ApiRequestError(response.status, error);
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
