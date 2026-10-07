import { apiClient } from '@/lib/api/client';
import type { HealthStatus } from '@/types';

export async function getHealthStatus(): Promise<HealthStatus> {
  return apiClient.get<HealthStatus>('/health', { revalidate: 30 });
}
