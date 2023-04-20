import { Observable } from 'rxjs';

export interface DeleteOrganizationInterface {
  deleteOrganization(id: number): Observable<string>;
}
