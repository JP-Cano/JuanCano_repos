import { OrganizationEntity } from '../../../organization/domain/models/organization.entity';
import { RepositoryEntity } from '../../../repository/domain/models/repository.entity';

export interface TribeEntityInterface {
  id?: number;
  name: string;
  status: number;
  organization?: OrganizationEntity;
  repositories?: RepositoryEntity[];
}

export class TribeEntity implements TribeEntityInterface {
  readonly id: number;
  readonly name: string;
  readonly status: number;
  readonly organization?: OrganizationEntity;
  readonly repositories?: RepositoryEntity[];
}
