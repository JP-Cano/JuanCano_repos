import { Column, Entity, OneToMany } from 'typeorm';
import { BaseData } from '../../../../shared/adapters/base/base.data';
import { TribeData } from '../../../../tribe/adapters/postgres/data/tribe.data';

@Entity('organizations')
export class OrganizationData extends BaseData {
  @Column()
  readonly name: string;

  @Column()
  readonly status: number;

  @OneToMany(() => TribeData, (tribe) => tribe.organization, {
    onDelete: 'CASCADE',
  })
  tribes: TribeData[];
}
