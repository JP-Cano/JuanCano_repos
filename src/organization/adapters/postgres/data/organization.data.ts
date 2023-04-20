import { Column, Entity } from 'typeorm';
import { BaseData } from '../../../../shared/adapters/base/base.data';

@Entity('organizations')
export class OrganizationData extends BaseData {
  @Column()
  readonly name: string;

  @Column()
  readonly status: number;
}
