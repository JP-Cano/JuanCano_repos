import { Controller, Get } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { RepositoryService } from '../services/repository.service';

@Controller('repository')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  public getRepositories(): Observable<object> {
    return from(this.repositoryService.getRepositoryInfo());
  }
}
