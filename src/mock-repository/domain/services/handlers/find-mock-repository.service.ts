import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
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
}
