import { Component } from '../../../component.js';
import { createRegionSelect } from './region-select.js';
import { createRandomSeedButton, createSeedInput } from './seed-input.js';

export const createMenu = () => {
  const regionSelect = createRegionSelect();
  const seedInput = createSeedInput();
  const seedButton = createRandomSeedButton();

  return new Component(
    { tag: 'nav', className: 'menu' },
    regionSelect,
    new Component(
      { className: 'seed-wrapper', text: 'Type any number and press Enter' },
      seedInput,
      seedButton
    )
  );
};
