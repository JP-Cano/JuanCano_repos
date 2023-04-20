import { OmitType } from '@nestjs/swagger';
import { OrganizationDto } from './organization.dto';

export class CreateOrganizationDto extends OmitType(OrganizationDto, [
  'id',
] as const) {}
