import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricData } from './adapters/postgres/data/metric.data';

@Module({
  imports: [TypeOrmModule.forFeature([MetricData])],
  exports: [TypeOrmModule],
})
export class MetricModule {}
