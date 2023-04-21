export enum RepositoryStateEnum {
  Verificado = 604,
  En_Espera = 605,
  Aprobado = 606,
}

export enum RepositoryVerificationStateEnum {
  Verificado = 'Verificado',
  En_Espera = 'En espera',
  Aprobado = 'Aprobado',
}

export const mapRepositoryStateToVerificationState = (
  state: RepositoryStateEnum,
): RepositoryVerificationStateEnum => {
  const map = {
    [RepositoryStateEnum.Verificado]:
      RepositoryVerificationStateEnum.Verificado,
    [RepositoryStateEnum.En_Espera]: RepositoryVerificationStateEnum.En_Espera,
    [RepositoryStateEnum.Aprobado]: RepositoryVerificationStateEnum.Aprobado,
  };

  if (map[state]) {
    return map[state];
  }
};
