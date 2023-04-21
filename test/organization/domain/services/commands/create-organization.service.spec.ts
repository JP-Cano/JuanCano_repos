import { of } from 'rxjs';
import { OrganizationRepository } from '../../../../../src/organization/domain/models/gateways/organization.repository';
import { CreateOrganizationService } from '../../../../../src/organization/domain/services';
import { OrganizationBuilder } from '../../../infrastructure/factory/organization.factory';

describe('CreateOrganizationService', () => {
  let createOrganizationService: CreateOrganizationService;
  let organizationRepository: OrganizationRepository;

  beforeEach(async () => {
    organizationRepository = {
      createOrganization: jest.fn(),
    } as unknown as OrganizationRepository;

    createOrganizationService = new CreateOrganizationService(
      organizationRepository,
    );
  });

  it('should be defined', () => {
    expect(createOrganizationService).toBeDefined();
  });

  describe(CreateOrganizationService.prototype.createOrganization, () => {
    it('Should create an organization successfully', (done) => {
      const organization = OrganizationBuilder();

      organizationRepository.createOrganization = jest
        .fn()
        .mockReturnValue(of(organization));

      const result = createOrganizationService.createOrganization(organization);

      result.subscribe((createdOrganization) => {
        expect(organizationRepository.createOrganization).toHaveBeenCalledWith(
          organization,
        );
        expect(createdOrganization).toEqual(organization);
        done();
      });
    });
  });
});
