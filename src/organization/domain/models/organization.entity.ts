import { TribeEntity } from '../../../tribe/domain/models/tribe.entity';

export interface OrganizationEntityInterface {
  id?: number;
  name: string;
  status: number;
  tribes?: TribeEntity[];
}
export class OrganizationEntity implements OrganizationEntityInterface {
  readonly id?: number;
  readonly name: string;
  readonly status: number;
  readonly tribes?: TribeEntity[];
}
