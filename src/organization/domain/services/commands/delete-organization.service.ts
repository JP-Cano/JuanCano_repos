import { Inject, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { RepositoryKey } from '../../../../shared/infrastructure/constants/repository-key.enum';
import { OrganizationRepository } from '../../models/gateways/organization.repository';
import { DeleteOrganizationInterface } from './interfaces/delete-organization.interface';

@Injectable()
export class DeleteOrganizationService implements DeleteOrganizationInterface {
  constructor(
    @Inject(RepositoryKey.ORGANIZATION)
    private readonly organizationRepository: OrganizationRepository,
  ) {}
  public deleteOrganization(id: number): Observable<string> {
    return from(this.organizationRepository.deleteOrganization(id));
  }
}
