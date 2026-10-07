import { apiClient } from '@/lib/api/client';
import type { PaginatedResponse, Testimonial } from '@/types';

export async function getTestimonials(params?: {
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<Testimonial>> {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));

  const qs = query.toString();
  return apiClient.get<PaginatedResponse<Testimonial>>(`/testimonials${qs ? `?${qs}` : ''}`, {
    revalidate: 3600,
  });
}
