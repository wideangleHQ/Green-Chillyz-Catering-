import { apiClient } from '@/lib/api/client';

export interface CreateContactRequestDto {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactConfirmation {
  id: string;
  message: string;
}

export async function submitContactRequest(
  dto: CreateContactRequestDto,
): Promise<ContactConfirmation> {
  return apiClient.post<ContactConfirmation>('/contact', dto);
}
