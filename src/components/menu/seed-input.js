import { Component } from '../../../component.js';
import { config } from '../../faker/config.js';
import { createInitialRecords, getFakerData } from '../../faker/faker.js';
import { updateUsersTable } from '../users-table/users-table.js';
import { faker } from 'https://cdn.jsdelivr.net/npm/@faker-js/faker/+esm';

export const createSeedInput = () => {
  const seedInput = new Component({ tag: 'input', className: 'seed-input' });
  seedInput.setAttribute('id', 'seed-input');
  seedInput.setAttribute('type', 'number');

  seedInput.addListener('change', async (e) => {
    const regionSelect = document.querySelector('.region-select');

    const fakerData = getFakerData({
      seed: e.target.value,
      country: regionSelect.value,
      isFirstPage: true,
    });
    const users = await createInitialRecords(fakerData);

    config.resetCurrentPageNumber();
    updateUsersTable(users);
  });

  const label = new Component({
    tag: 'label',
    className: 'input-label',
    text: 'Seed: ',
  });

  label.setAttribute('for', 'seed-input');

  return new Component({}, label, seedInput);
};

export const createRandomSeedButton = () => {
  const randomSeedButton = new Component({
    tag: 'button',
    className: 'random-seed-button',
    text: 'random seed',
  });
  randomSeedButton.addListener('click', async () => {
    const regionSelect = document.querySelector('.region-select');
    const seedInput = document.querySelector('.seed-input');
    const randomSeed = faker.number.int();
    seedInput.value = randomSeed;

    const fakerData = getFakerData({
      seed: randomSeed,
      country: regionSelect.value,
      isFirstPage: true,
    });
    const users = await createInitialRecords(fakerData);

    config.resetCurrentPageNumber();
    updateUsersTable(users);
  });
  return randomSeedButton;
};
