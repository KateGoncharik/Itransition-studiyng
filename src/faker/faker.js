import {
  ADDITIONAL_RECORDS_AMOUNT,
  config,
  INITIAL_RECORDS_AMOUNT,
} from './config.js';
import { getLocalizedAddress, getLocalizedFaker } from './localization.js';

export const createInitialRecords = async (seed, country) => {
  const records = [];

  const { faker, countryName } = getLocalizedFaker(country);
  faker.seed(seed + 0);

  for (let i = 0; i < INITIAL_RECORDS_AMOUNT; i++) {
    const userRecord = {
      id: i + 1,
      randomId: faker.string.uuid(),
      fullName: faker.person.fullName(),
      telephone: faker.phone.number(),
      address: getLocalizedAddress(faker, countryName),
    };
    records.push(userRecord);
  }
  return records;
};
export const create10MoreRecords = async (seed, country) => {
  const records = [];
  const startIndexForNewRecords = getStartIndexForNewRecords(
    config.getCurrentPageNumber()
  );
  const { faker, countryName } = getLocalizedFaker(country);
  faker.seed(seed + config.getCurrentPageNumber());
  for (let i = 0; i < ADDITIONAL_RECORDS_AMOUNT; i++) {
    const userRecord = {
      id: startIndexForNewRecords + i + 1,
      randomId: faker.string.uuid(),
      fullName: faker.person.fullName(),
      telephone: faker.phone.number(),
      address: getLocalizedAddress(faker, countryName),
    };
    records.push(userRecord);
  }
  config.incrementCurrentPageNumber();

  return records;
};

const getStartIndexForNewRecords = (currentPageNumber) => {
  return currentPageNumber === 0
    ? INITIAL_RECORDS_AMOUNT
    : currentPageNumber * ADDITIONAL_RECORDS_AMOUNT + INITIAL_RECORDS_AMOUNT;
};
