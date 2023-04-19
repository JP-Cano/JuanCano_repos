import { Observable } from 'rxjs';

export const Repository = {
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

export const Repositories: Observable<object> = new Observable((observer) => {
  observer.next(Repository);
  observer.complete();
});
