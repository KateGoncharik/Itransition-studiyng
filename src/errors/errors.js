import {
  addRandomChar,
  deleteChar,
  swapAdjacentChars,
} from './error-functions.js';

const rng = new Math.seedrandom('42');

const errorFunctions = [
  (str) => deleteChar(str, rng),
  (str) => addRandomChar(str, rng),
  (str) => swapAdjacentChars(str, rng),
];

const applyErrorToField = (fieldValue, errorCount) => {
  return applyError(errorCount, fieldValue);
};

export const applyErrorsToRecord = (record, totalErrors) => {
  const fields = ['fullName', 'address', 'telephone'];
  let errorsRemaining = totalErrors;

  while (errorsRemaining > 0) {
    const randomField = _.sample(fields);
    const errorsForField = Math.min(1, errorsRemaining);
    record[randomField] = applyErrorToField(
      record[randomField],
      errorsForField
    );
    errorsRemaining -= errorsForField;
  }

  return record;
};

export const applyError = (count, str) => {
  const applyMultipleErrors = times(count, (inputStr) => {
    const randomError =
      errorFunctions[Math.floor(rng() * errorFunctions.length)];
    return randomError(inputStr.length > 0 ? inputStr : str);
  });
  return applyMultipleErrors(str);
};

function times(n, fn) {
  if (n < 0) throw new Error('The first argument cannot be negative.');
  return (arg) => {
    let result = arg;
    for (let i = 0; i < Math.floor(n); i++) {
      result = fn(result);
    }
    return rng() < n % 1 ? fn(result) : result;
  };
}
