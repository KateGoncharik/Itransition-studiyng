import { Component } from '../component.js';
import { createInitialRecords, getFakerData } from './faker/faker.js';
import { updateUsersTable } from './components/users-table/users-table.js';
import { createMenu } from './components/menu/menu.js';
import { loadMore } from './components/users-table/scroll.js';

export const initialData = { seed: 42, region: 'Russia' };

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

  const fakerData = getFakerData(initialData.seed, initialData.region, true);
  const users = await createInitialRecords(fakerData);
  updateUsersTable(users);

  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadMore();
    }
  });
};
