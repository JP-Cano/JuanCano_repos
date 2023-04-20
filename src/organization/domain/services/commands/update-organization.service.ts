import { Inject, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { RepositoryKey } from '../../../../shared/infrastructure/constants/repository-key.enum';
import { OrganizationRepository } from '../../models/gateways/organization.repository';
import { OrganizationEntityInterface } from '../../models/organization.entity';
import { UpdateOrganizationInterface } from './interfaces/update-organization.interface';

@Injectable()
export class UpdateOrganizationService implements UpdateOrganizationInterface {
  constructor(
    @Inject(RepositoryKey.ORGANIZATION)
    private readonly organizationRepository: OrganizationRepository,
  ) {}
  public updateOrganization(
    id: number,
    organization: Partial<OrganizationEntityInterface>,
  ): Observable<string> {
    return from(
      this.organizationRepository.updateOrganization(id, organization),
    );
  }
}
