import { Observable } from 'rxjs';
import { OrganizationEntityInterface } from '../../../models/organization.entity';

export interface FindOrganizationInterface {
  findAllOrganizations(): Observable<OrganizationEntityInterface[]>;
  findOrganizationById(id: number): Observable<OrganizationEntityInterface>;
}
