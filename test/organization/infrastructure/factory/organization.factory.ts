import { Builder } from 'builder-pattern';
import { OrganizationEntity } from '../../../../src/organization/domain/models/organization.entity';

export const OrganizationBuilder = (): OrganizationEntity =>
  Builder(OrganizationEntity).id(1).name('Banco Pichincha').status(1).build();

export const OrganizationsBuilder = (): OrganizationEntity[] => [
  Builder(OrganizationEntity)
    .id(1)
    .name('Organización Demo uno')
    .status(1)
    .build(),
  Builder(OrganizationEntity)
    .id(2)
    .name('Organización Demo dos')
    .status(1)
    .build(),
  Builder(OrganizationEntity)
    .id(3)
    .name('Organización Demo tres')
    .status(1)
    .build(),
];
