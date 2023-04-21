import { Test, TestingModule } from '@nestjs/testing';
import { map, of } from 'rxjs';
import {
  MockRepositoryEntity,
  MockRepositoryEntityInterface,
} from '../../../../../src/mock-repository/domain/models/mock-repository.entity';
import { FindMockRepositoryService } from '../../../../../src/mock-repository/domain/services/handlers/find-mock-repository.service';

describe('FindMockRepositoryService', () => {
  let provider: FindMockRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindMockRepositoryService],
    }).compile();

    provider = module.get<FindMockRepositoryService>(FindMockRepositoryService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe(FindMockRepositoryService.prototype.findMockRepository, () => {
    it('Should return a list of Mock repositories', (done) => {
      provider.findMockRepository().subscribe((result) => {
        expect(result).toEqual(MockRepositoryEntity);
        done();
      });
    });
  });

  describe(FindMockRepositoryService.prototype.findMockRepositoryById, () => {
    it('Should return a MockRepository by its Id', (done) => {
      const repositoryId = 1;
      const expectedResult = {
        repositories: {
          id: 1,
          state: 604,
        },
      };

      jest.spyOn(provider, 'findMockRepositoryById').mockReturnValue(
        of(MockRepositoryEntity).pipe(
          map((repositories) =>
            repositories?.repositories?.find(
              (repository) => repository.id === repositoryId,
            ),
          ),
          map(
            (foundRepository) =>
              foundRepository as unknown as MockRepositoryEntityInterface,
          ),
        ),
      );

      provider.findMockRepositoryById(repositoryId).subscribe((result) => {
        expect(result).toEqual(expectedResult.repositories);
        done();
      });
    });
  });
});
