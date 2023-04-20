import { Inject, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { RepositoryKey } from '../../../../shared/infrastructure/constants/repository-key.enum';
import { OrganizationRepository } from '../../models/gateways/organization.repository';
import { OrganizationEntityInterface } from '../../models/organization.entity';
import { FindOrganizationInterface } from './interfaces/find-organization.interface';

@Injectable()
export class FindOrganizationService implements FindOrganizationInterface {
  constructor(
    @Inject(RepositoryKey.ORGANIZATION)
    private readonly organizationRepository: OrganizationRepository,
  ) {}
  public findAllOrganizations(): Observable<OrganizationEntityInterface[]> {
    return from(this.organizationRepository.findAllOrganizations());
  }

  public findOrganizationById(
    id: number,
  ): Observable<OrganizationEntityInterface> {
    return from(this.organizationRepository.findOrganizationById(id));
  }
}
