import { Module } from '@nestjs/common';
import { RepositoryService } from './services/repository.service';
import { RepositoryController } from './controllers/repository.controller';

@Module({
  imports: [],
  controllers: [RepositoryController],
  providers: [RepositoryService],
})
export class AppModule {}
