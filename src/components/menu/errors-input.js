import { Component } from '../../../component.js';
import { config } from '../../faker/config.js';
import { createInitialRecords, getFakerData } from '../../faker/faker.js';
import { updateUsersTable } from '../users-table/users-table.js';

export const createErrorsInput = () => {
  const errorsSlider = new Component({
    tag: 'input',
    className: 'errors-slider',
  });
  errorsSlider.setAttribute('min', '0');
  errorsSlider.setAttribute('max', '10');

  errorsSlider.setAttribute('id', 'errors-slider');
  errorsSlider.setAttribute('type', 'range');

  errorsSlider.addListener('change', async (e) => {
    const input = document.querySelector('.errors-input');
    input.value = e.target.value;

    handleErrorsUpdate();
  });

  const errorsInput = new Component({
    tag: 'input',
    className: 'errors-input',
  });
  errorsInput.setAttribute('min', '0');
  errorsInput.setAttribute('max', '1000');

  errorsInput.setAttribute('id', 'errors-input');
  errorsInput.setAttribute('type', 'number');

  errorsInput.addListener('change', async (e) => {
    const slider = document.querySelector('.errors-slider');
    slider.value = Math.min(e.target.value, 10);

    handleErrorsUpdate();
  });

  const label = new Component({
    tag: 'label',
    className: 'input-label',
    text: 'errors: ',
  });

  label.setAttribute('for', 'errors-input');

  return new Component({}, label, errorsSlider, errorsInput);
};

const handleErrorsUpdate = async () => {
  const regionSelect = document.querySelector('.region-select');
  const seedInput = document.querySelector('.seed-input');

  const fakerData = getFakerData({
    seed: seedInput.value,
    country: regionSelect.value,
    isFirstPage: true,
  });
  const users = await createInitialRecords(fakerData);

  config.resetCurrentPageNumber();
  updateUsersTable(users);
};
