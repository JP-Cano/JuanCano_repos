import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CsvGeneratorModule } from '../csv-generator/csv-generator.module';
import { MetricModule } from '../metric/metric.module';
import { MockRepositoryModule } from '../mock-repository/mock-repository.module';
import { OrganizationAdapter } from '../organization/adapters/postgres/organization.adapter';
import { OrganizationModule } from '../organization/organization.module';
import { RepositoryAdapter } from '../repository/adapters/postgres/repository.adapter';
import { RepositoryModule } from '../repository/repository.module';
import { TribeAdapter } from '../tribe/adapters/postgres/tribe.adapter';
import { TribeModule } from '../tribe/tribe.module';
import { PostgresModule } from './adapters/postgres/postgres.module';
import { HealthCheckController } from './controllers/health-check/health-check.controller';
import { RepositoryKey } from './infrastructure/constants/repository-key.enum';

@Global()
@Module({
  imports: [
    TerminusModule,
    HttpModule,
    PostgresModule,
    OrganizationModule,
    RepositoryModule,
    TribeModule,
    MetricModule,
    CsvGeneratorModule,
    MockRepositoryModule,
  ],
  providers: [
    { provide: RepositoryKey.ORGANIZATION, useClass: OrganizationAdapter },
    { provide: RepositoryKey.TRIBE, useClass: TribeAdapter },
    { provide: RepositoryKey.REPOSITORY, useClass: RepositoryAdapter },
  ],
  controllers: [HealthCheckController],
  exports: [
    RepositoryKey.ORGANIZATION,
    RepositoryKey.TRIBE,
    RepositoryKey.REPOSITORY,
  ],
})
export class SharedModule {}
