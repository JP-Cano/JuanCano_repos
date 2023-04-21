import { Inject, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { RepositoryKey } from '../../../../shared/infrastructure/constants/repository-key.enum';
import { TribeRepository } from '../../models/gateways/tribe.repository';
import { TribeEntityInterface } from '../../models/tribe.entity';
import { TribeServiceInterface } from './interfaces/tribe-service.interface';

@Injectable()
export class FindTribeService implements TribeServiceInterface {
  constructor(
    @Inject(RepositoryKey.TRIBE)
    private readonly tribeRepository: TribeRepository,
  ) {}
  public findTribeById(id: number): Observable<TribeEntityInterface> {
    return from(this.tribeRepository.findTribeById(id));
  }
}
