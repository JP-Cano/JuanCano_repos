import { Controller, Get, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { from, map, Observable, switchMap } from 'rxjs';
import { IsNumberParamPipe } from '../../organization/infrastructure/decorators/is-number-param.pipe';
import { RepositoryMetricsCsvGeneratorService } from '../domain/services/handlers/repository-metrics-csv.generator.service';

@ApiTags('repository-csv-generator')
@Controller('repositories')
export class RepositoryMetricsCsvController {
  constructor(
    private readonly repositoryMetricCsvGeneratorService: RepositoryMetricsCsvGeneratorService,
  ) {}

  @ApiOperation({
    operationId: 'generate_repository_csv_get',
    summary:
      'Endpoint to generate and return a CSV file containing repository metrics',
  })
  @ApiOkResponse({
    description: 'CSV metrics data for the specified repository',
    content: {
      'text/csv': {},
    },
  })
  @Get(':id/csv')
  public generateRepositoryCsv(
    @IsNumberParamPipe('id') id: number,
    @Res() res: Response,
  ): Observable<unknown> {
    return this.repositoryMetricCsvGeneratorService.generateCsvMetrics(id).pipe(
      map((csv) => {
        res.set({
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="repositories-${id}.csv"`,
        });
        res.attachment(`repositories-${id}.csv`);
        res.send(csv);
        return csv;
      }),
      switchMap((res) => from(res)),
    );
  }
}
