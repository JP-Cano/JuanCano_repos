import { Builder } from 'builder-pattern';
import { of } from 'rxjs';
import { OrganizationRepository } from '../../../../../src/organization/domain/models/gateways/organization.repository';
import { OrganizationEntity } from '../../../../../src/organization/domain/models/organization.entity';
import { UpdateOrganizationService } from '../../../../../src/organization/domain/services';
import { ResponseMessage } from '../../../../../src/shared/infrastructure/constants/response.enum';
import { OrganizationBuilder } from '../../../infrastructure/factory/organization.factory';

describe('UpdateOrganizationService', () => {
  let updateOrganizationService: UpdateOrganizationService;
  let organizationRepository: OrganizationRepository;

  beforeEach(async () => {
    organizationRepository = {
      updateOrganization: jest.fn(),
    } as unknown as OrganizationRepository;

    updateOrganizationService = new UpdateOrganizationService(
      organizationRepository,
    );
  });

  it('should be defined', () => {
    expect(updateOrganizationService).toBeDefined();
  });

  describe(UpdateOrganizationService.prototype.updateOrganization, () => {
    it('Should update a organization by its Id and return a success message', (done) => {
      const organization = OrganizationBuilder();

      const updateOrganizationName = Builder(OrganizationEntity)
        .name('New name')
        .build();

      organizationRepository.updateOrganization = jest
        .fn()
        .mockReturnValue(of(ResponseMessage.ORGANIZATION_UPDATED_SUCCESSFULLY));

      const result = updateOrganizationService.updateOrganization(
        organization.id,
        updateOrganizationName,
      );

      result.subscribe((message) => {
        expect(organizationRepository.updateOrganization).toHaveBeenCalled();
        expect(message).toBe(ResponseMessage.ORGANIZATION_UPDATED_SUCCESSFULLY);
        done();
      });
    });
  });
});
