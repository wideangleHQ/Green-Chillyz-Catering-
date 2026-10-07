import { apiClient } from '@/lib/api/client';
import type { Faq, FaqCategory } from '@/types';

export async function getFaqs(category?: FaqCategory): Promise<Faq[]> {
  const qs = category ? `?category=${category}` : '';
  return apiClient.get<Faq[]>(`/faqs${qs}`, { revalidate: 86400 });
}
