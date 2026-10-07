import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { EventType } from '@prisma/client';

/**
 * Payload for POST /enquiries.
 *
 * The website form collects exactly the six fields the client asked for
 * ("Which customer information should the website enquiry form collect?":
 * Name, Phone Number, Event Type, Event Date, Guest Count, Event Location).
 *
 * `email` and `message` remain ACCEPTED but optional and are no longer rendered
 * by the form. They are kept for API backwards compatibility and because the
 * nullable columns already exist — dropping them would be a destructive
 * migration for no benefit. See docs/src/12-decisions.md (2026-09-30).
 *
 * Backend validation is authoritative; the form's HTML5 attributes are a UX
 * convenience only. Guest count is bounded by the capacity figures the client
 * supplied (50 minimum, 200000 maximum).
 */
export class CreateEnquiryDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @IsString()
  @MinLength(7)
  @MaxLength(20)
  phone!: string;

  /** Accepted for backwards compatibility; not collected by the current form. */
  @IsOptional()
  @IsEmail()
  @MaxLength(200)
  email?: string;

  @IsEnum(EventType)
  eventType!: EventType;

  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200000)
  guestCount?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;

  /** Accepted for backwards compatibility; not collected by the current form. */
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  message?: string;
}
