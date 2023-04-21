import { Inject, Injectable } from '@nestjs/common';
import { from, Observable, switchMap } from 'rxjs';
import { RepositoryKey } from '../../../../shared/infrastructure/constants/repository-key.enum';
import { FindTribeService } from '../../../../tribe/domain/services/handlers/find-tribe.service';
import { repositories } from '../../../infrastructure/types/repositories.type';
import { RepositoryEntityRepository } from '../../models/gateways/repository-entity.repository';
import { RepositoryServiceInterface } from './interfaces/repository-service.interface';

@Injectable()
export class FindRepositoryMetricsByTribeService
  implements RepositoryServiceInterface
{
  constructor(
    @Inject(RepositoryKey.REPOSITORY)
    private readonly repositoryEntityRepository: RepositoryEntityRepository,
    private readonly findTribeService: FindTribeService,
  ) {}

  public findRepositoryMetricsByTribeId(
    tribeId: number,
  ): Observable<repositories> {
    return from(this.findTribeService.findTribeById(tribeId)).pipe(
      switchMap((tribe) =>
        this.repositoryEntityRepository.findMetricsByTribeId(tribe.id),
      ),
    );
  }
}
