import { of } from 'rxjs';
import { OrganizationRepository } from '../../../../../src/organization/domain/models/gateways/organization.repository';
import { FindOrganizationService } from '../../../../../src/organization/domain/services';
import {
  OrganizationBuilder,
  OrganizationsBuilder,
} from '../../../infrastructure/factory/organization.factory';

describe('FindOrganizationService', () => {
  let findOrganizationService: FindOrganizationService;
  let organizationRepository: OrganizationRepository;

  beforeEach(async () => {
    organizationRepository = {
      findAllOrganizations: jest.fn(),
      findOrganizationById: jest.fn(),
    } as unknown as OrganizationRepository;

    findOrganizationService = new FindOrganizationService(
      organizationRepository,
    );
  });

  it('should be defined', () => {
    expect(findOrganizationService).toBeDefined();
  });

  describe(FindOrganizationService.prototype.findAllOrganizations, () => {
    it('Should return a list of organizations', (done) => {
      const organizations = OrganizationsBuilder();

      organizationRepository.findAllOrganizations = jest
        .fn()
        .mockReturnValue(of(organizations));

      const result = findOrganizationService.findAllOrganizations();

      result.subscribe((organizationList) => {
        expect(organizationRepository.findAllOrganizations).toHaveBeenCalled();
        expect(organizationList).toBeDefined();
        expect(organizationList).toEqual(organizations);
        done();
      });
    });
  });

  describe(FindOrganizationService.prototype.findOrganizationById, () => {
    it('Should return an organization by its Id', (done) => {
      const organization = OrganizationBuilder();

      organizationRepository.findOrganizationById = jest
        .fn()
        .mockReturnValue(of(organization));

      const result = findOrganizationService.findOrganizationById(
        organization.id,
      );

      result.subscribe((selectedOrganization) => {
        expect(organizationRepository.findOrganizationById).toHaveBeenCalled();
        expect(selectedOrganization).toBeDefined();
        expect(selectedOrganization.id).toEqual(organization.id);
        expect(selectedOrganization.name).toEqual(organization.name);
        done();
      });
    });
  });
});
