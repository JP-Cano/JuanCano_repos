import { Injectable } from '@nestjs/common';
import { createObjectCsvWriter } from 'csv-writer';
import { concatMap, from, map, Observable } from 'rxjs';
import { FindRepositoryMetricsByTribeService } from '../../../../repository/domain/services/handlers/find-repository-metrics-by-tribe.service';
import { CsvRepositoryFormatEntity } from '../../models/csv-repository-format.entity';
import { FindRepositoryMetricsCsvInterface } from './interfaces/find-repository-metrics-csv.interface';

@Injectable()
export class RepositoryMetricsCsvGeneratorService
  implements FindRepositoryMetricsCsvInterface
{
  constructor(
    private readonly findRepositoryMetricsByTribeService: FindRepositoryMetricsByTribeService,
  ) {}

  public generateCsvMetrics(tribeId: number): Observable<any> {
    const csvWriter = createObjectCsvWriter({
      path: `reports/repositories-${tribeId}.csv`,
      header: this.configureCsvHeaders(),
    });

    return this.findRepositoryMetricsByTribeService
      .findRepositoryMetricsByTribeId(tribeId)
      .pipe(
        concatMap((result) => {
          const records = result.repositories.map((repo) => ({ ...repo }));
          console.log(records);
          return from(csvWriter.writeRecords(records)).pipe(map(() => records));
        }),
      );
  }

  private configureCsvHeaders(): CsvRepositoryFormatEntity[] {
    return [
      { id: 'id', title: 'ID' },
      { id: 'name', title: 'Name' },
      { id: 'tribe', title: 'Tribe' },
      { id: 'organization', title: 'Organization' },
      { id: 'coverage', title: 'Coverage' },
      { id: 'codeSmells', title: 'Code Smells' },
      { id: 'bugs', title: 'Bugs' },
      { id: 'vulnerabilities', title: 'Vulnerabilities' },
      { id: 'hotspots', title: 'Hotspots' },
      { id: 'verificationState', title: 'Verification State' },
      { id: 'state', title: 'State' },
    ];
  }
}
