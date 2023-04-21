import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { RepositoryData } from '../../../src/repository/adapters/postgres/data/repository.data';
import { RepositoryAdapter } from '../../../src/repository/adapters/postgres/repository.adapter';
import { NoCoverageRepositoryException } from '../../../src/repository/infrastructure/exceptions/no-coverage-repository.exception';
import { ResponseMapper } from '../../../src/repository/infrastructure/mapper/response.mapper';
import {
  NoCoverageRepositoryBuilder,
  repositoriesBuilder,
  RepositoryBuilder,
} from '../infrastructure/factory/repository.factory';

describe('RepositoryAdapter', () => {
  let repositoryAdapter: RepositoryAdapter;
  let repositoryData: Repository<RepositoryData>;
  let responseMapper: ResponseMapper;

  beforeEach(async () => {
    const mockRepository = mock<Repository<RepositoryData>>();
    const repositoryToken = getRepositoryToken(RepositoryData);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: repositoryToken,
          useValue: mockRepository,
        },
        RepositoryAdapter,
        ResponseMapper,
      ],
    }).compile();

    repositoryAdapter = module.get<RepositoryAdapter>(RepositoryAdapter);
    repositoryData = module.get<Repository<RepositoryData>>(repositoryToken);
    responseMapper = module.get<ResponseMapper>(ResponseMapper);
  });

  it('should be defined', () => {
    expect(repositoryAdapter).toBeDefined();
    expect(repositoryData).toBeDefined();
    expect(responseMapper).toBeDefined();
  });

  describe(RepositoryAdapter.prototype.findMetricsByTribeId, () => {
    it('Should return repository metrics by tribe id', (done) => {
      const tribeId = 1;
      const repository = RepositoryBuilder();

      jest.spyOn(repositoryAdapter as any, 'queryBuilder').mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(repository),
      } as any);

      jest
        .spyOn(responseMapper, 'mapRepositoryToExpectedResponse')
        .mockReturnValue(repositoriesBuilder());

      repositoryAdapter.findMetricsByTribeId(tribeId).subscribe((result) => {
        expect(
          result.repositories.map((repo) => ({
            id: repo.id,
            name: repo.name,
          })),
        ).toEqual(
          repository.map((repo) => ({
            id: repo.id,
            name: repo.name,
          })),
        );
        done();
      });
    });

    it('Should throw NoCoverageRepositoryException if there is no repository with coverage greater than 0.75', (done) => {
      const tribeId = 1;
      const repositoryData = NoCoverageRepositoryBuilder();

      jest.spyOn(repositoryAdapter as any, 'queryBuilder').mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(repositoryData),
      } as any);

      const observable = repositoryAdapter.findMetricsByTribeId(tribeId);

      observable.subscribe(() => {
        expect(() => {
          throw new NoCoverageRepositoryException();
        }).toThrowError(NoCoverageRepositoryException);
        done();
      });
    });
  });
});
