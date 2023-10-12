import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { ResponseMessage } from '../../../shared/infrastructure/constants/response.enum';
import { OrganizationRepository } from '../../domain/models/gateways/organization.repository';
import {
  OrganizationEntity,
  OrganizationEntityInterface,
} from '../../domain/models/organization.entity';
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
      switchMap((res) =>
        from(this.organizationData.delete(res.id)).pipe(
          map(() => ResponseMessage.ORGANIZATION_DELETED_SUCCESSFULLY),
          catchError((error) => {
            throw new InternalServerErrorException(
              ResponseMessage.FAILED_TO_DELETE_ORGANIZATION,
              error.message,
            );
          }),
        ),
      ),
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
    return this.findOrganizationById(id).pipe(
      switchMap((res) =>
        from(this.organizationData.update(res.id, organization)).pipe(
          map(() => ResponseMessage.ORGANIZATION_UPDATED_SUCCESSFULLY),
        ),
      ),
    );
  }
}
