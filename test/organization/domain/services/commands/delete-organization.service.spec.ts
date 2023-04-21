import { of } from 'rxjs';
import { OrganizationRepository } from '../../../../../src/organization/domain/models/gateways/organization.repository';
import { DeleteOrganizationService } from '../../../../../src/organization/domain/services';
import { ResponseMessage } from '../../../../../src/shared/infrastructure/constants/response.enum';
import { OrganizationBuilder } from '../../../infrastructure/factory/organization.factory';

describe('DeleteOrganizationService', () => {
  let deleteOrganizationService: DeleteOrganizationService;
  let organizationRepository: OrganizationRepository;

  beforeEach(async () => {
    organizationRepository = {
      deleteOrganization: jest.fn(),
    } as unknown as OrganizationRepository;

    deleteOrganizationService = new DeleteOrganizationService(
      organizationRepository,
    );
  });

  it('should be defined', () => {
    expect(deleteOrganizationService).toBeDefined();
  });

  describe(DeleteOrganizationService.prototype.deleteOrganization, () => {
    it('Should delete a organization by its Id and return a message', (done) => {
      const organization = OrganizationBuilder();

      organizationRepository.deleteOrganization = jest
        .fn()
        .mockReturnValue(of(ResponseMessage.ORGANIZATION_DELETED_SUCCESSFULLY));

      const result = deleteOrganizationService.deleteOrganization(
        organization.id,
      );

      result.subscribe((deletedOrganization) => {
        expect(organizationRepository.deleteOrganization).toHaveBeenCalled();
        expect(deletedOrganization).toEqual(
          ResponseMessage.ORGANIZATION_DELETED_SUCCESSFULLY,
        );
        done();
      });
    });
  });
});
