import { Observable } from 'rxjs';
import { MockRepositoryEntity } from '../../../models/mock-repository.entity';

export interface FindMockRepositoryInterface {
  findMockRepository(): Observable<typeof MockRepositoryEntity>;
}
