import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { MockRepositoryEntityInterface } from '../domain/models/mock-repository.entity';
import { FindMockRepositoryService } from '../domain/services/handlers/find-mock-repository.service';

@ApiTags('Mock Repository')
@Controller('mock-repository')
export class MockRepositoryController {
  constructor(
    private readonly findMockRepositoryService: FindMockRepositoryService,
  ) {}

  @ApiOperation({
    operationId: 'mock_repository_get',
    summary: 'Endpoint to find mock repositories',
  })
  @Get()
  public findMockRepositories(): Observable<MockRepositoryEntityInterface> {
    return from(this.findMockRepositoryService.findMockRepository());
  }
}
