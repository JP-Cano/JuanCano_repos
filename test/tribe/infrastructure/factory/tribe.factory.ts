import { Builder } from 'builder-pattern';
import { MetricEntity } from '../../../../src/metric/domain/models/metric.entity';
import { RepositoryEntity } from '../../../../src/repository/domain/models/repository.entity';
import { TribeEntity } from '../../../../src/tribe/domain/models/tribe.entity';
import { OrganizationBuilder } from '../../../organization/infrastructure/factory/organization.factory';

const VALID_COVERAGE = 0.78;
const NOT_VALID_COVERAGE = 0.5;

export const TribeWithCoverageBuilder = () =>
  Builder(TribeEntity)
    .id(1)
    .name('Centro Digital')
    .status(1)
    .repositories([
      Builder(RepositoryEntity)
        .name('cd-common-utils')
        .metrics(
          Builder(MetricEntity)
            .vulnerabilities(0)
            .coverage(VALID_COVERAGE)
            .build(),
        )
        .build(),
    ])
    .organization(OrganizationBuilder())
    .build();

export const TribeBuilder = () =>
  Builder(TribeEntity)
    .id(1)
    .name('Centro Digital')
    .status(1)
    .repositories([
      Builder(RepositoryEntity)
        .name('cd-common-utils')
        .metrics(Builder(MetricEntity).vulnerabilities(0).build())
        .build(),
    ])
    .organization(OrganizationBuilder())
    .build();

export const TribeWithNoValidCoverageBuilder = () =>
  Builder(TribeEntity)
    .id(1)
    .name('Centro Digital')
    .status(1)
    .repositories([
      Builder(RepositoryEntity)
        .name('cd-common-utils')
        .metrics(
          Builder(MetricEntity)
            .vulnerabilities(0)
            .coverage(NOT_VALID_COVERAGE)
            .build(),
        )
        .build(),
    ])
    .organization(OrganizationBuilder())
    .build();
