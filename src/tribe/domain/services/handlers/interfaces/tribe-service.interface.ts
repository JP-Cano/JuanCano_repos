import { Observable } from 'rxjs';
import { TribeEntityInterface } from '../../../models/tribe.entity';

export interface TribeServiceInterface {
  findTribeById(id: number): Observable<TribeEntityInterface>;
}
