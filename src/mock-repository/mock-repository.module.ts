import { Module } from '@nestjs/common';
import { MockRepositoryController } from './controller/mock-repository.controller';
import { FindMockRepositoryService } from './domain/services/handlers/find-mock-repository.service';

@Module({
  providers: [FindMockRepositoryService],
  controllers: [MockRepositoryController],
  exports: [FindMockRepositoryService],
})
export class MockRepositoryModule {}
