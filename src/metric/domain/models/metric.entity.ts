import { RepositoryData } from '../../../repository/adapters/postgres/data/repository.data';

export interface MetricEntityInterface {
  id?: number;
  coverage: number;
  bugs: number;
  vulnerabilities: number;
  hotspot: number;
  code_smells: number;
  repository?: RepositoryData;
}

export class MetricEntity implements MetricEntityInterface {
  readonly id?: number;
  readonly coverage: number;
  readonly bugs: number;
  readonly vulnerabilities: number;
  readonly hotspot: number;
  readonly code_smells: number;
  readonly repository?: RepositoryData;
}
