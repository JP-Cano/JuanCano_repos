import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockRepositoryModule } from '../mock-repository/mock-repository.module';
import { TribeModule } from '../tribe/tribe.module';
import { RepositoryData } from './adapters/postgres/data/repository.data';
import { RepositoryAdapter } from './adapters/postgres/repository.adapter';
import { RepositoryController } from './controllers/repository.controller';
import { FindRepositoryMetricsByTribeService } from './domain/services/handlers/find-repository-metrics-by-tribe.service';
import { ResponseMapper } from './infrastructure/mapper/response.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([RepositoryData]),
    TribeModule,
    MockRepositoryModule,
  ],
  providers: [
    FindRepositoryMetricsByTribeService,
    ResponseMapper,
    RepositoryAdapter,
  ],
  controllers: [RepositoryController],
  exports: [TypeOrmModule, FindRepositoryMetricsByTribeService, ResponseMapper],
})
export class RepositoryModule {}
