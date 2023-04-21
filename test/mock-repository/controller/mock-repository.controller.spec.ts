import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { MockRepositoryController } from '../../../src/mock-repository/controller/mock-repository.controller';
import { MockRepositoryEntity } from '../../../src/mock-repository/domain/models/mock-repository.entity';
import { FindMockRepositoryService } from '../../../src/mock-repository/domain/services/handlers/find-mock-repository.service';

describe('MockRepositoryController', () => {
  let controller: MockRepositoryController;
  let mockService: FindMockRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockRepositoryController],
      providers: [FindMockRepositoryService],
    }).compile();

    controller = module.get<MockRepositoryController>(MockRepositoryController);
    mockService = module.get<FindMockRepositoryService>(
      FindMockRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(MockRepositoryController.prototype.findMockRepositories, () => {
    it('Should return a list of mock repositories', (done) => {
      const mockRepositories = of(MockRepositoryEntity);

      jest
        .spyOn(mockService, 'findMockRepository')
        .mockReturnValue(mockRepositories);

      const foundMocks = controller.findMockRepositories();

      expect(foundMocks).toEqual(mockRepositories);
      done();
    });
  });
});
