import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { IsNumberParamPipe } from '../../organization/infrastructure/decorators/is-number-param.pipe';
import { FindRepositoryMetricsByTribeService } from '../domain/services/handlers/find-repository-metrics-by-tribe.service';
import { repositories } from '../infrastructure/types/repositories.type';
import { Repositories } from './dto/repositories.dto';

@ApiTags('Repository')
@Controller('repository')
export class RepositoryController {
  constructor(
    private readonly findRepositoryServiceByTribe: FindRepositoryMetricsByTribeService,
  ) {}

  @ApiOperation({
    operationId: 'repository_metrics_get',
    summary: 'Endpoint to get all metrics from a repository',
  })
  @ApiOkResponse({ type: Repositories })
  @Get(':id')
  public findRepositoryMetricsByTribeId(
    @IsNumberParamPipe('id') id: number,
  ): Observable<repositories> {
    return from(
      this.findRepositoryServiceByTribe.findRepositoryMetricsByTribeId(id),
    );
  }
}
