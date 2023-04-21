import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { MetricData } from '../../../../metric/adapters/postgres/data/metric.data';
import { MetricEntity } from '../../../../metric/domain/models/metric.entity';
import { BaseData } from '../../../../shared/adapters/base/base.data';
import { TribeData } from '../../../../tribe/adapters/postgres/data/tribe.data';
import { TribeEntity } from '../../../../tribe/domain/models/tribe.entity';
import { RepositoryEntityInterface } from '../../../domain/models/repository.entity';
import { RepositoryStateEnum } from '../../../infrastructure/constants/repository-state.enum';
import { RepositoryStatusEnum } from '../../../infrastructure/constants/repository-status.enum';

@Entity('repositories')
export class RepositoryData
  extends BaseData
  implements RepositoryEntityInterface
{
  @Column()
  readonly name: string;

  @Column({ type: 'enum', enum: RepositoryStateEnum })
  readonly state: RepositoryStateEnum;

  @Column({ type: 'enum', enum: RepositoryStatusEnum })
  readonly status: RepositoryStatusEnum;

  @ManyToOne(() => TribeData, (tribe) => tribe.repositories, {
    onDelete: 'CASCADE',
  })
  readonly tribe: TribeEntity;

  @OneToOne(() => MetricData, (metric) => metric.repository, {
    onDelete: 'CASCADE',
  })
  readonly metrics: MetricEntity;
}
