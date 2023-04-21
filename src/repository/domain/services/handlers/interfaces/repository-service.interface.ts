import { Observable } from 'rxjs';
import { repositories } from '../../../../infrastructure/types/repositories.type';

export interface RepositoryServiceInterface {
  findRepositoryMetricsByTribeId(tribeId: number): Observable<repositories>;
}
