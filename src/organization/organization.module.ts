import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationData } from './adapters/postgres/data/organization.data';
import { OrganizationController } from './controllers/organization.controller';
import * as SERVICE from './domain/services';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationData])],
  providers: [
    SERVICE.CreateOrganizationService,
    SERVICE.UpdateOrganizationService,
    SERVICE.DeleteOrganizationService,
    SERVICE.FindOrganizationService,
  ],
  controllers: [OrganizationController],
  exports: [
    TypeOrmModule,
    SERVICE.CreateOrganizationService,
    SERVICE.UpdateOrganizationService,
    SERVICE.DeleteOrganizationService,
    SERVICE.FindOrganizationService,
  ],
})
export class OrganizationModule {}
