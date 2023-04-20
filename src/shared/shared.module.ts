import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { OrganizationAdapter } from '../organization/adapters/postgres/organization.adapter';
import { OrganizationModule } from '../organization/organization.module';
import { PostgresModule } from './adapters/postgres/postgres.module';
import { HealthCheckController } from './controllers/health-check/health-check.controller';
import { RepositoryKey } from './infrastructure/constants/repository-key.enum';

@Global()
@Module({
  imports: [TerminusModule, HttpModule, PostgresModule, OrganizationModule],
  providers: [
    { provide: RepositoryKey.ORGANIZATION, useClass: OrganizationAdapter },
  ],
  controllers: [HealthCheckController],
  exports: [RepositoryKey.ORGANIZATION],
})
export class SharedModule {}
