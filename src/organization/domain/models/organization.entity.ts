export interface OrganizationEntityInterface {
  id?: number;
  name: string;
  status: number;
}
export class OrganizationEntity implements OrganizationEntityInterface {
  readonly id?: number;
  readonly name: string;
  readonly status: number;
}
