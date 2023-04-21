import { Observable } from 'rxjs';

export interface FindRepositoryMetricsCsvInterface {
  generateCsvMetrics(tribeId: number): Observable<any>;
}
