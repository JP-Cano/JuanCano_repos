import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrganizationData } from '../../../../organization/adapters/postgres/data/organization.data';
import { OrganizationEntity } from '../../../../organization/domain/models/organization.entity';
import { RepositoryData } from '../../../../repository/adapters/postgres/data/repository.data';
import { RepositoryEntity } from '../../../../repository/domain/models/repository.entity';
import { BaseData } from '../../../../shared/adapters/base/base.data';
import { TribeEntityInterface } from '../../../domain/models/tribe.entity';

@Entity('tribes')
export class TribeData extends BaseData implements TribeEntityInterface {
  @Column()
  readonly name: string;

  @Column()
  readonly status: number;

  @ManyToOne(() => OrganizationData, (organization) => organization.tribes, {
    onDelete: 'CASCADE',
  })
  readonly organization: OrganizationEntity;

  @OneToMany(() => RepositoryData, (repository) => repository.tribe, {
    onDelete: 'CASCADE',
  })
  readonly repositories: RepositoryEntity[];
}
