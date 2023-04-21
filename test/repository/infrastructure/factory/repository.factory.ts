import { Builder } from 'builder-pattern';
import { MetricEntity } from '../../../../src/metric/domain/models/metric.entity';
import { Repositories } from '../../../../src/repository/controllers/dto/repositories.dto';
import { RepositoryEntity } from '../../../../src/repository/domain/models/repository.entity';
import {
  RepositoryStateEnum,
  RepositoryStateEnumSpanish,
} from '../../../../src/repository/infrastructure/constants/repository-state.enum';
import { RepositoryStatusEnum } from '../../../../src/repository/infrastructure/constants/repository-status.enum';
import { repositories } from '../../../../src/repository/infrastructure/types/repositories.type';
import { TribeEntity } from '../../../../src/tribe/domain/models/tribe.entity';
import { OrganizationBuilder } from '../../../organization/infrastructure/factory/organization.factory';

export const RepositoryBuilder = (): Repositories[] => [
  Builder(Repositories)
    .id('1')
    .name('cd-commons-utils')
    .tribe('Centro Digital')
    .coverage('76%')
    .verificationState('Verificado')
    .state(RepositoryStateEnumSpanish.ENABLE)
    .build(),
  Builder(Repositories)
    .id('2')
    .name('cd-commons-text')
    .tribe('Centro Digital')
    .coverage('95%')
    .verificationState('Verificado')
    .state(RepositoryStateEnumSpanish.ENABLE)
    .build(),
];

export const repositoriesBuilder = (): repositories =>
  Builder<repositories>().repositories(RepositoryBuilder()).build();

export const NoCoverageRepositoryBuilder = (): RepositoryEntity[] => [
  Builder<RepositoryEntity>()
    .id(1)
    .name('cd-commons-text')
    .tribe(
      Builder(TribeEntity)
        .id(1)
        .name('Centro Digital')
        .organization(OrganizationBuilder())
        .status(1)
        .build(),
    )
    .status(RepositoryStatusEnum.ACTIVE)
    .state(RepositoryStateEnum.ENABLE)
    .metrics(Builder(MetricEntity).coverage(0.4).build())
    .build(),
];
