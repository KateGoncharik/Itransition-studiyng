import { faker as fakerFR } from "https://cdn.jsdelivr.net/npm/@faker-js/faker/locale/fr/+esm";
import { faker as fakerRU } from "https://cdn.jsdelivr.net/npm/@faker-js/faker/locale/ru/+esm";
import { faker as fakerPL } from "https://cdn.jsdelivr.net/npm/@faker-js/faker/locale/pl/+esm";

export const getLocalizedAddress = (faker, countryName) => {
  return `${countryName}, ${faker.location.city()},${faker.location.streetAddress()}`;
};

export const getLocalizedFaker = (country) => {
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
  return { faker, countryName };
};
