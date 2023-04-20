import { Observable } from 'rxjs';
import { OrganizationEntityInterface } from '../../../models/organization.entity';

export interface UpdateOrganizationInterface {
  updateOrganization(
    id: number,
    organization: Partial<OrganizationEntityInterface>,
  ): Observable<string>;
}
