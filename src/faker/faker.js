import { getLocalizedAddress, getLocalizedFaker } from './localization.js';

export const createInitialRecords = async (seed, country) => {
  const records = [];

  const { faker, countryName } = getLocalizedFaker(country);
  faker.seed(seed + 0);

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
let pageNumber = 0;
export const create10MoreRecords = async (seed, country) => {
  pageNumber += 1;
  const records = [];
  const startIndexForNewRecords = pageNumber === 0 ? 20 : pageNumber * 10 + 20;
  const { faker, countryName } = getLocalizedFaker(country);
  faker.seed(seed + pageNumber);
  for (let i = 0; i < 10; i++) {
    const userRecord = {
      id: startIndexForNewRecords + i + 1,
      randomId: faker.string.uuid(),
      fullName: faker.person.fullName(),
      telephone: faker.phone.number(),
      address: getLocalizedAddress(faker, countryName),
    };
    records.push(userRecord);
  }
  return records;
};
