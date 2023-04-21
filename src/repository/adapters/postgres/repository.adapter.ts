import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { MockRepositoryEntity } from '../../../mock-repository/domain/models/mock-repository.entity';
import { RepositoryEntityRepository } from '../../domain/models/gateways/repository-entity.repository';
import { NoCoverageRepositoryException } from '../../infrastructure/exceptions/no-coverage-repository.exception';
import { ResponseMapper } from '../../infrastructure/mapper/response.mapper';
import { repositories } from '../../infrastructure/types/repositories.type';
import { RepositoryData } from './data/repository.data';

@Injectable()
export class RepositoryAdapter implements RepositoryEntityRepository {
  constructor(
    @InjectRepository(RepositoryData)
    private readonly repositoryData: Repository<RepositoryData>,
    private readonly responseMapper: ResponseMapper,
  ) {}

  public findMetricsByTribeId(tribeId: number): Observable<repositories> {
    const today = new Date();
    const yearStart = new Date(today.getFullYear(), 0, 1);

    const queryBuilder = this.queryBuilder(tribeId, yearStart);
    return from(queryBuilder.getMany()).pipe(
      map((repository) => {
        if (repository.length === 0) {
          throw new NoCoverageRepositoryException();
        }
        return this.responseMapper.mapRepositoryToExpectedResponse(
          repository,
          MockRepositoryEntity,
        );
      }),
    );
  }

  private queryBuilder(
    tribeId: number,
    yearStart?: Date,
  ): SelectQueryBuilder<RepositoryData> {
    return this.repositoryData
      .createQueryBuilder('repository')
      .leftJoinAndSelect('repository.metrics', 'metrics')
      .leftJoinAndSelect('repository.tribe', 'tribe')
      .leftJoinAndSelect('tribe.organization', 'organization')
      .where('tribe.id = :tribeId', { tribeId })
      .andWhere('repository.state = :state', { state: 'E' })
      .andWhere('metrics.coverage > :coverage', { coverage: 0.75 })
      .andWhere('repository.created_at >= :yearStart', { yearStart });
  }
}
