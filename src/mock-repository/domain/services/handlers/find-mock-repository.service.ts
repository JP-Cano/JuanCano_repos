import { Injectable } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import {
  MockRepositoryEntity,
  MockRepositoryEntityInterface,
} from '../../models/mock-repository.entity';
import { FindMockRepositoryInterface } from './interfaces/find-mock-repository.interface';

@Injectable()
export class FindMockRepositoryService implements FindMockRepositoryInterface {
  public findMockRepository(): Observable<MockRepositoryEntityInterface> {
    return of(MockRepositoryEntity);
  }

  public findMockRepositoryById(
    id: number,
  ): Observable<MockRepositoryEntityInterface> {
    return of(MockRepositoryEntity).pipe(
      map((repositories) =>
        repositories?.repositories?.find((repository) => repository.id === id),
      ),
      map(
        (foundRepository) =>
          foundRepository as unknown as MockRepositoryEntityInterface,
      ),
    );
  }
}
