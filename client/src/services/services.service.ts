import { apiClient } from '@/lib/api/client';
import type { Service } from '@/types';

export async function getServices(): Promise<Service[]> {
  return apiClient.get<Service[]>('/services', { revalidate: 3600 });
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  return apiClient.get<Service>(`/services/${slug}`, { revalidate: 3600 });
}
