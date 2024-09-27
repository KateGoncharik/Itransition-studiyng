import { Component } from '../component.js';
import { createInitialRecords } from './faker/faker.js';
import { updateUsersTable } from './components/users-table/users-table.js';
import { createMenu } from './components/menu/menu.js';
import { loadMore } from './components/users-table/scroll.js';

export const startApp = async () => {
  document.body.append(
    new Component(
      { className: 'app' },
      new Component(
        { className: 'wrapper' },
        createMenu(),
        new Component({ className: 'table-container' })
      )
    ).getNode()
  );

  const initialData = { seed: 42, region: 'Russia' };
  const users = await createInitialRecords(
    initialData.seed,
    initialData.region
  );
  updateUsersTable(users);

  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadMore();
    }
  });
};
