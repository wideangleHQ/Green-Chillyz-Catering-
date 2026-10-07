import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { EnquiriesService } from './enquiries.service';

/**
 * Public enquiry endpoints: POST /api/v1/enquiries, GET /api/v1/enquiries/ref/:referenceId.
 *
 * No authentication — this is the public Get-a-Quote form. Docs:
 * docs/src/06-enquiry-system.md, docs/src/09-technical-architecture.md.
 */
@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiries: EnquiriesService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  create(@Body() dto: CreateEnquiryDto) {
    return this.enquiries.create(dto);
  }

  @Get('ref/:referenceId')
  findByReference(@Param('referenceId') referenceId: string) {
    return this.enquiries.findByReference(referenceId);
  }
}
