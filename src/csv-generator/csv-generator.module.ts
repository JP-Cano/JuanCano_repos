import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { RepositoryMetricsCsvController } from './controllers/repository-metrics-csv.controller';
import { RepositoryMetricsCsvGeneratorService } from './domain/services/handlers/repository-metrics-csv.generator.service';

@Module({
  imports: [RepositoryModule],
  providers: [RepositoryMetricsCsvGeneratorService],
  controllers: [RepositoryMetricsCsvController],
})
export class CsvGeneratorModule {}
