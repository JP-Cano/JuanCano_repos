import { Observable } from 'rxjs';
import {
  OrganizationEntity,
  OrganizationEntityInterface,
} from '../organization.entity';

export interface OrganizationRepository {
  createOrganization(
    organization: OrganizationEntity,
  ): Observable<OrganizationEntityInterface>;

  updateOrganization(
    id: number,
    organization: Partial<OrganizationEntity>,
  ): Observable<string>;

  findAllOrganizations(): Observable<OrganizationEntityInterface[]>;

  findOrganizationById(id: number): Observable<OrganizationEntityInterface>;

  deleteOrganization(id: number): Observable<string>;
}
