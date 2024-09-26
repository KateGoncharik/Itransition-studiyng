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
  } else if (country === "Belarus") {
    faker = fakerRU;
    countryName = "Беларусь";
  } else if (country === "Poland") {
    faker = fakerPL;
    countryName = "Poland";
  }

  faker.seed(seed);

  // faker.setLocale(locale);

  for (let i = 0; i < 20; i++) {
    const userRecord = {
      id: i + 1,
      randomId: faker.string.uuid(),
      fullName: faker.person.fullName(),
      telephone: faker.phone.number(),
      address: {
        street: faker.location.streetAddress(), // Улица
        city: faker.location.city(), // Город
        postalCode: faker.location.zipCode(), // Почтовый индекс
        country: countryName,
      },
    };
    records.push(userRecord);
  }
  return records;
};
