import { apiClient } from '@/lib/api/client';
import type { GalleryCategory, GalleryItem, PaginatedResponse } from '@/types';

export async function getGalleryItems(params?: {
  category?: GalleryCategory;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<GalleryItem>> {
  const query = new URLSearchParams();
  if (params?.category) query.set('category', params.category);
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));

  const qs = query.toString();
  return apiClient.get<PaginatedResponse<GalleryItem>>(`/gallery${qs ? `?${qs}` : ''}`, {
    revalidate: 3600,
  });
}
