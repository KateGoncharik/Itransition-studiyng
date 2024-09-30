import { Component } from '../../../component.js';
import { config } from '../../faker/config.js';
import { createInitialRecords, getFakerData } from '../../faker/faker.js';
import { updateUsersTable } from '../users-table/users-table.js';

export const createRegionSelect = () => {
  const franceOption = new Component({ tag: 'option', text: 'France' });
  franceOption.setAttribute('value', 'France');

  const russiaOption = new Component({ tag: 'option', text: 'Russia' });
  russiaOption.setAttribute('selected', true);
  russiaOption.setAttribute('value', 'Russia');

  const polandOption = new Component({ tag: 'option', text: 'Poland' });
  polandOption.setAttribute('value', 'Poland');

  const regionSelect = new Component(
    { tag: 'select', className: 'region-select' },
    franceOption,
    russiaOption,
    polandOption
  );
  regionSelect.setAttribute('id', 'region');

  regionSelect.addListener('change', async (e) => {
    const seedInput = document.querySelector('.seed-input');

    const fakerData = getFakerData({
      seed: seedInput.value,
      country: e.target.value,
      isFirstPage: true,
    });
    const users = await createInitialRecords(fakerData);

    config.resetCurrentPageNumber();
    updateUsersTable(users);
  });

  const label = new Component({
    tag: 'label',
    className: 'input-label',
    text: 'Region: ',
  });

  label.setAttribute('for', 'region');

  return new Component({ className: '' }, label, regionSelect);
};
