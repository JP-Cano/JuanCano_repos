import { NotFoundException } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { Observable, of } from 'rxjs';
import { Repositories } from '../../../../../src/repository/controllers/dto/repositories.dto';
import { RepositoryEntityRepository } from '../../../../../src/repository/domain/models/gateways/repository-entity.repository';
import { FindRepositoryMetricsByTribeService } from '../../../../../src/repository/domain/services/handlers/find-repository-metrics-by-tribe.service';
import { repositories } from '../../../../../src/repository/infrastructure/types/repositories.type';
import { ResponseMessage } from '../../../../../src/shared/infrastructure/constants/response.enum';
import { FindTribeService } from '../../../../../src/tribe/domain/services/handlers/find-tribe.service';
import { TribeBuilder } from '../../../../tribe/infrastructure/factory/tribe.factory';

describe('FindRepositoryMetricsByTribeService', () => {
  let findRepositoryMetricsByTribeService: FindRepositoryMetricsByTribeService;
  let repositoryEntityRepository: RepositoryEntityRepository;
  let findTribeService: FindTribeService;

  beforeEach(async () => {
    findTribeService = {
      findTribeById: jest.fn(),
    } as unknown as FindTribeService;

    repositoryEntityRepository = {
      findMetricsByTribeId: jest.fn(),
    } as unknown as RepositoryEntityRepository;

    findRepositoryMetricsByTribeService =
      new FindRepositoryMetricsByTribeService(
        repositoryEntityRepository,
        findTribeService,
      );
  });

  it('should be defined', () => {
    expect(findRepositoryMetricsByTribeService).toBeDefined();
  });

  describe(
    FindRepositoryMetricsByTribeService.prototype
      .findRepositoryMetricsByTribeId,
    () => {
      it('Should return repository metrics by repository ID', (done) => {
        const tribe = TribeBuilder();

        const repositoriesBuilder = Builder<repositories>()
          .repositories([Builder(Repositories).vulnerabilities(0).build()])
          .build();

        jest
          .spyOn(findTribeService, 'findTribeById')
          .mockReturnValue(of(tribe));
        jest
          .spyOn(repositoryEntityRepository, 'findMetricsByTribeId')
          .mockReturnValue(of(repositoriesBuilder));

        const result: Observable<any> =
          findRepositoryMetricsByTribeService.findRepositoryMetricsByTribeId(
            tribe.id,
          );

        result.subscribe((result) => {
          expect(result).toBeDefined();
          expect(result.repositories).toEqual(
            tribe.repositories.map((repo) => repo.metrics),
          );
          expect(findTribeService.findTribeById).toHaveBeenCalledWith(tribe.id);
          expect(
            repositoryEntityRepository.findMetricsByTribeId,
          ).toHaveBeenCalledWith(tribe.id);
          done();
        });
      });

      it('Should throw a NotFoundException when the tribe is not found', (done) => {
        const tribeId = null;

        jest.spyOn(findTribeService, 'findTribeById').mockReturnValue(of(null));

        const result = findTribeService.findTribeById(tribeId);

        result.subscribe(() => {
          expect(() => {
            throw new NotFoundException(ResponseMessage.TRIBE_NOT_REGISTERED);
          }).toThrow();
          done();
        });
      });
    },
  );
});
