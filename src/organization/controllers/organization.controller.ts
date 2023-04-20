import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { OrganizationEntityInterface } from '../domain/models/organization.entity';
import {
  CreateOrganizationService,
  DeleteOrganizationService,
  FindOrganizationService,
  UpdateOrganizationService,
} from '../domain/services';
import { IsNumberParamPipe } from '../infrastructure/decorators/is-number-param.pipe';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationDto } from './dto/organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly createOrganizationService: CreateOrganizationService,
    private readonly findOrganizationService: FindOrganizationService,
    private readonly deleteOrganizationService: DeleteOrganizationService,
    private readonly updateOrganizationService: UpdateOrganizationService,
  ) {}

  @ApiOperation({
    operationId: 'organization_create',
    description: 'Endpoint to create a new organization',
  })
  @ApiOkResponse({
    description: 'Organization created successfully',
  })
  @Post()
  public createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Observable<OrganizationEntityInterface> {
    return from(
      this.createOrganizationService.createOrganization(createOrganizationDto),
    );
  }

  @ApiOperation({
    operationId: 'organization_findAll',
    description: 'Endpoint to find all organizations',
  })
  @Get()
  public findAllOrganizations(): Observable<OrganizationDto[]> {
    return from(this.findOrganizationService.findAllOrganizations());
  }

  @ApiOperation({
    operationId: 'organization_delete',
    description: 'Endpoint to delete a organization by its ID',
  })
  @Delete(':id')
  public deleteOrganization(
    @IsNumberParamPipe('id') id: number,
  ): Observable<string> {
    return from(this.deleteOrganizationService.deleteOrganization(id));
  }

  @ApiOperation({
    operationId: 'organization_update',
    description: 'Endpoint to update a organization',
  })
  @Patch(':id')
  public updateOrganization(
    @IsNumberParamPipe('id') id: number,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Observable<string> {
    return from(
      this.updateOrganizationService.updateOrganization(
        id,
        updateOrganizationDto,
      ),
    );
  }
}
