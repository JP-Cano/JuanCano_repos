import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TribeData } from './adapters/postgres/data/tribe.data';
import { FindTribeService } from './domain/services/handlers/find-tribe.service';

@Module({
  imports: [TypeOrmModule.forFeature([TribeData])],
  providers: [FindTribeService],
  exports: [TypeOrmModule, FindTribeService],
})
export class TribeModule {}
