import { apiClient } from '@/lib/api/client';
import type { Enquiry, EventType } from '@/types';

export interface CreateEnquiryDto {
  name: string;
  phone: string;
  email?: string;
  eventType: EventType;
  eventDate?: string;
  guestCount?: number;
  location?: string;
  message?: string;
}

export interface EnquiryConfirmation {
  referenceId: string;
  enquiryId: string;
  message: string;
}

export async function createEnquiry(dto: CreateEnquiryDto): Promise<EnquiryConfirmation> {
  return apiClient.post<EnquiryConfirmation>('/enquiries', dto);
}

export async function getEnquiryByReference(referenceId: string): Promise<Enquiry> {
  return apiClient.get<Enquiry>(`/enquiries/ref/${referenceId}`);
}
