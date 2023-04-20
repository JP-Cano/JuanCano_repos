import { Inject, Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { from, Observable } from 'rxjs';
import { RepositoryKey } from '../../../../shared/infrastructure/constants/repository-key.enum';
import { OrganizationRepository } from '../../models/gateways/organization.repository';
import {
  OrganizationEntity,
  OrganizationEntityInterface,
} from '../../models/organization.entity';
import { CreateOrganizationInterface } from './interfaces/create-organization.interface';

@Injectable()
export class CreateOrganizationService implements CreateOrganizationInterface {
  constructor(
    @Inject(RepositoryKey.ORGANIZATION)
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  public createOrganization(
    organization: OrganizationEntity,
  ): Observable<OrganizationEntityInterface> {
    const newOrganization = this.organizationBuilder(organization);
    return from(
      this.organizationRepository.createOrganization(newOrganization),
    );
  }

  private organizationBuilder(
    organization: OrganizationEntity,
  ): OrganizationEntity {
    return Builder(OrganizationEntity)
      .id(organization.id)
      .name(organization.name)
      .status(organization.status)
      .build();
  }
}
