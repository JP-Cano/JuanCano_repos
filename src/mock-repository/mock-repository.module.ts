import { Module } from '@nestjs/common';
import { FindMockRepositoryService } from './domain/services/handlers/find-mock-repository.service';
import { MockRepositoryController } from './controller/mock-repository.controller';

@Module({
  providers: [FindMockRepositoryService],
  controllers: [MockRepositoryController],
  exports: [FindMockRepositoryService],
})
export class MockRepositoryModule {}
