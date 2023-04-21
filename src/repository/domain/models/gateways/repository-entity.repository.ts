import { Observable } from 'rxjs';
import { repositories } from '../../../infrastructure/types/repositories.type';

export interface RepositoryEntityRepository {
  findMetricsByTribeId(tribeId: number): Observable<repositories>;
}
