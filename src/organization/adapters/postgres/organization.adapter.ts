import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  catchError,
  defaultIfEmpty,
  from,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { Repository } from 'typeorm';
import { OrganizationRepository } from '../../domain/models/gateways/organization.repository';
import {
  OrganizationEntity,
  OrganizationEntityInterface,
} from '../../domain/models/organization.entity';
import { ResponseMessage } from '../../infrastructure/constants/response.enum';
import { OrganizationData } from './data/organization.data';

export class OrganizationAdapter implements OrganizationRepository {
  constructor(
    @InjectRepository(OrganizationData)
    private readonly organizationData: Repository<OrganizationData>,
  ) {}

  public createOrganization(
    organization: OrganizationEntity,
  ): Observable<OrganizationEntityInterface> {
    return from(this.organizationData.save(organization));
  }

  public deleteOrganization(id: number): Observable<string> {
    return this.findOrganizationById(id).pipe(
      switchMap(() =>
        from(this.organizationData.delete(id)).pipe(
          map(() => ResponseMessage.ORGANIZATION_DELETED_SUCCESSFULLY),
          catchError(() => {
            throw new InternalServerErrorException(
              ResponseMessage.FAILED_TO_DELETE_ORGANIZATION,
            );
          }),
        ),
      ),
      map((response) => response as string),
    );
  }

  public findAllOrganizations(): Observable<OrganizationEntityInterface[]> {
    return from(this.organizationData.find()).pipe(
      map((items) => (items.length === 0 ? [] : items)),
    );
  }

  public findOrganizationById(
    id: number,
  ): Observable<OrganizationEntityInterface> {
    return from(this.organizationData.findOneBy({ id })).pipe(
      defaultIfEmpty(null),
      map((result) => {
        if (!result) {
          throw new NotFoundException(ResponseMessage.ORGANIZATION_NOT_FOUND);
        }
        return result;
      }),
    );
  }

  public updateOrganization(
    id: number,
    organization: Partial<OrganizationEntity>,
  ): Observable<string> {
    return from(this.organizationData.update(id, organization)).pipe(
      switchMap(() => this.findOrganizationById(id)),
      map(() => ResponseMessage.ORGANIZATION_UPDATED_SUCCESSFULLY),
    );
  }
}
