import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { RepositoryData } from '../../../../repository/adapters/postgres/data/repository.data';

@Entity('metrics')
export class MetricData {
  @Column({ primary: true })
  id: number;

  @Column({ type: 'float' })
  coverage: number;

  @Column()
  bugs: number;

  @Column()
  vulnerabilities: number;

  @Column()
  hotspot: number;

  @Column()
  code_smells: number;

  @OneToOne(() => RepositoryData, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  repository: RepositoryData;
}
