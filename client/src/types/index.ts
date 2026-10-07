// Shared TypeScript types mirroring the Prisma schema.
// These are DTOs (Data Transfer Objects) — not ORM entities.
// Add/remove fields here when the schema changes.

// ─── Enums ────────────────────────────────────────────────────────────────────

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'REQUIREMENTS_COLLECTED'
  | 'QUOTE_PREPARED'
  | 'QUOTE_SENT'
  | 'FOLLOW_UP'
  | 'CONFIRMED'
  | 'EVENT_COMPLETED'
  | 'LOST'
  | 'CANCELLED';

// Mirrors the `EventType` enum in server/prisma/schema.prisma.
// One member per service the client confirmed they provide, plus OTHER for the
// client's open-ended "Any Type of Catering" answer.
// Display labels live in client/src/content/eventTypes.ts — keep both in sync.
export type EventType =
  | 'WEDDING'
  | 'RECEPTION'
  | 'ENGAGEMENT'
  | 'HALDI_MEHENDI'
  | 'BIRTHDAY'
  | 'ANNIVERSARY'
  | 'CORPORATE'
  | 'OFFICE_BUSINESS'
  | 'PRIVATE_EVENT'
  | 'HOUSE_PARTY'
  | 'OUTDOOR'
  | 'INSTITUTIONAL'
  | 'OTHER';

export type GalleryCategory =
  | 'WEDDING'
  | 'CORPORATE'
  | 'BIRTHDAY'
  | 'ANNIVERSARY'
  | 'POOJA_CEREMONY'
  | 'GRADUATION'
  | 'SOCIAL_GATHERING'
  | 'FOOD_PRESENTATION'
  | 'SETUP_DECOR'
  | 'TEAM'
  | 'OTHER';

export type FaqCategory = 'GENERAL' | 'BOOKING' | 'MENU' | 'LOGISTICS' | 'PRICING';

// ─── Entities ─────────────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  referenceId: string;
  customerId: string;
  customer?: Customer;
  eventType: EventType;
  eventDate: string | null;
  guestCount: number | null;
  location: string | null;
  message: string | null;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  altText: string | null;
  caption: string | null;
  category: GalleryCategory;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  eventType: EventType | null;
  rating: number;
  body: string;
  isApproved: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── API Response wrappers ────────────────────────────────────────────────────

export interface ApiError {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface HealthStatus {
  status: string;
  database: string;
  timestamp: string;
  version: string;
}
