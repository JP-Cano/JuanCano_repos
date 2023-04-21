import { NotFoundException } from '@nestjs/common';

export enum RepositoryStateEnum {
  ENABLE = 'E',
  DISABLE = 'D',
  ARCHIVE = 'A',
}

export enum RepositoryStateEnumSpanish {
  ENABLE = 'Habilitado',
  DISABLE = 'Desactivado',
  ARCHIVE = 'Archivado',
}

export const mapRepositoryStateEnumToSpanish = (
  repositoryState: RepositoryStateEnum,
): RepositoryStateEnumSpanish => {
  const map = {
    [RepositoryStateEnum.ENABLE]: RepositoryStateEnumSpanish.ENABLE,
    [RepositoryStateEnum.DISABLE]: RepositoryStateEnumSpanish.DISABLE,
    [RepositoryStateEnum.ARCHIVE]: RepositoryStateEnumSpanish.ARCHIVE,
  };

  if (map[repositoryState]) {
    return map[repositoryState];
  }

  throw new NotFoundException('Invalid status');
};
