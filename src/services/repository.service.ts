import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Repositories } from '../models/repository.entity';

@Injectable()
export class RepositoryService {
  public getRepositoryInfo(): Observable<object> {
    return from(Repositories);
  }
}
