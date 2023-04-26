import { Test, TestingModule } from '@nestjs/testing';
import { MockRepositoryEntity } from '../../../../../src/mock-repository/domain/models/mock-repository.entity';
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
});
