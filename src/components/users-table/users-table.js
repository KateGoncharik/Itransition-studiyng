import { Component } from '../../../component.js';
import { create10MoreRecords, getFakerData } from '../../faker/faker.js';
import { createUserRow } from './user-row.js';

export const createUsersTable = (users) => {
  const table = new Component({ tag: 'table', className: 'users-table' });
  const thead = new Component({ tag: 'thead', className: 'thead-light' });
  const headerRow = new Component({ tag: 'tr' });

  ['id', 'randomId', 'name', 'location', 'telephone'].forEach((headerText) => {
    const th = new Component({ tag: 'th', text: headerText });
    headerRow.append(th);
  });

  thead.append(headerRow);
  table.append(thead);

  const tbody = new Component({
    tag: 'tbody',
    className: 'users-table-body',
  });
  users.forEach((user) => {
    const row = createUserRow(user);
    tbody.append(row);
  });

  table.append(tbody);
  return table;
};

export const updateUsersTable = (users) => {
  const container = document.querySelector('.table-container');
  const userTable = createUsersTable(users);

  container.innerHTML = '';
  container.appendChild(userTable.getNode());
};

export const addRecordsToTable = async () => {
  const table = document.querySelector('.users-table');
  const seedInput = document.querySelector('.seed-input');
  const regionInput = document.querySelector('.region-select');

  const fakerData = getFakerData(seedInput.value, regionInput.value, false);
  const records = await create10MoreRecords(fakerData);
  const nodes = records
    .map((user) => createUserRow(user))
    .map((component) => component.getNode());
  table.append(...nodes);
};
