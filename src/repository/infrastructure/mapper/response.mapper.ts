import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { MockRepositoryEntityInterface } from '../../../mock-repository/domain/models/mock-repository.entity';
import { Repositories } from '../../controllers/dto/repositories.dto';
import { RepositoryEntityInterface } from '../../domain/models/repository.entity';
import { mapRepositoryStateEnumToSpanish } from '../constants/repository-state.enum';
import { mapRepositoryStateToVerificationState } from '../constants/repository-verification-state.enum';
import { repositories } from '../types/repositories.type';

@Injectable()
export class ResponseMapper {
  private readonly HUNDRED = 100;

  public mapRepositoryToExpectedResponse(
    repositoryEntityInterface: RepositoryEntityInterface[],
    mockValue: MockRepositoryEntityInterface,
  ): repositories {
    const output = repositoryEntityInterface.map((repositoryEntity) =>
      Builder(Repositories)
        .id(repositoryEntity.id.toString())
        .name(repositoryEntity.name)
        .tribe(repositoryEntity.tribe.name)
        .organization(repositoryEntity.tribe.organization.name)
        .coverage(
          `${(repositoryEntity.metrics.coverage * this.HUNDRED).toFixed(0)}%`,
        )
        .codeSmells(repositoryEntity.metrics.code_smells)
        .bugs(repositoryEntity.metrics.bugs)
        .vulnerabilities(repositoryEntity.metrics.vulnerabilities)
        .hotspots(repositoryEntity.metrics.hotspot)
        .verificationState(repositoryEntity.status)
        .state(mapRepositoryStateEnumToSpanish(repositoryEntity.state))
        .build(),
    );
    return {
      repositories: this.mapResponseWithMockRepositories(output, mockValue),
    };
  }

  private mapResponseWithMockRepositories(
    repository: Repositories[],
    mockValue: MockRepositoryEntityInterface,
  ): Repositories[] {
    const mockRepos = mockValue.repositories;

    return repository.map((repo) => {
      const mockRepo = mockRepos.find((mock) => mock.id === Number(repo.id));

      if (mockRepo) {
        return {
          ...repo,
          verificationState: mapRepositoryStateToVerificationState(
            mockRepo.state,
          ),
        };
      }
      return repo;
    });
  }
}
