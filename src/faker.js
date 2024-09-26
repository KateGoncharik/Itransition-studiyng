import { faker as fakerFR } from "https://cdn.jsdelivr.net/npm/@faker-js/faker/locale/fr/+esm";
import { faker as fakerRU } from "https://cdn.jsdelivr.net/npm/@faker-js/faker/locale/ru/+esm";
import { faker as fakerPL } from "https://cdn.jsdelivr.net/npm/@faker-js/faker/locale/pl/+esm";

export const create20Records = async (seed, country) => {
  const records = [];

  let faker;

  let countryName;

  if (country === "France") {
    faker = fakerFR;
    countryName = "France";
  } else if (country === "Russia") {
    faker = fakerRU;
    countryName = "Россия";
  } else if (country === "Poland") {
    faker = fakerPL;
    countryName = "Polska";
  }

  faker.seed(seed);

  for (let i = 0; i < 20; i++) {
    const userRecord = {
      id: i + 1,
      randomId: faker.string.uuid(),
      fullName: faker.person.fullName(),
      telephone: faker.phone.number(),
      address: `${countryName}, ${faker.location.city()},${faker.location.streetAddress()}`,
    };
    records.push(userRecord);
  }
  return records;
};
