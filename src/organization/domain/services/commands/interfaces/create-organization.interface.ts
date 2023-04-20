import { Observable } from 'rxjs';
import {
  OrganizationEntity,
  OrganizationEntityInterface,
} from '../../../models/organization.entity';

export interface CreateOrganizationInterface {
  createOrganization(
    organization: OrganizationEntity,
  ): Observable<OrganizationEntityInterface>;
}
