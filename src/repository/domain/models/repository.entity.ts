import { MetricEntity } from '../../../metric/domain/models/metric.entity';
import { TribeEntity } from '../../../tribe/domain/models/tribe.entity';
import { RepositoryStateEnum } from '../../infrastructure/constants/repository-state.enum';
import { RepositoryStatusEnum } from '../../infrastructure/constants/repository-status.enum';

export interface RepositoryEntityInterface {
  id?: number;
  name?: string;
  state?: RepositoryStateEnum;
  create_time?: Date;
  status?: RepositoryStatusEnum;
  tribe?: TribeEntity;
  metrics?: MetricEntity;
}
export class RepositoryEntity implements RepositoryEntityInterface {
  readonly id?: number;
  readonly name?: string;
  readonly state?: RepositoryStateEnum;
  readonly create_time?: Date;
  readonly status?: RepositoryStatusEnum;
  readonly tribe?: TribeEntity;
  readonly metrics?: MetricEntity;
}
