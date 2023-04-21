export interface MockRepositoryEntityInterface {
  repositories: { id: number; state: number }[];
}

export const MockRepositoryEntity: MockRepositoryEntityInterface = {
  repositories: [
    {
      id: 1,
      state: 604,
    },
    {
      id: 2,
      state: 605,
    },
    {
      id: 3,
      state: 606,
    },
  ],
};
