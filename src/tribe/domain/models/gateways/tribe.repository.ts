import { Observable } from 'rxjs';
import { TribeEntityInterface } from '../tribe.entity';

export interface TribeRepository {
  findTribeById(id: number): Observable<TribeEntityInterface>;
}
