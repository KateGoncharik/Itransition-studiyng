import { getLocalizedAddress, getLocalizedFaker } from './localization.js';

export const createInitialRecords = async (seed, country) => {
  const records = [];

  const { faker, countryName } = getLocalizedFaker(country);
  faker.seed(seed);

  for (let i = 0; i < 20; i++) {
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

  const { faker, countryName } = getLocalizedFaker(country);
  faker.seed(seed);

  for (let i = 0; i < 10; i++) {
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