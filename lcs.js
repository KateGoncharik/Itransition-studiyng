const { argv } = require('node:process');

const findShortestCommonSubstring = (strings) => {
  if (strings.length === 0) {
    return '';
  }
  if (strings.length === 1) {
    return strings[0];
  }
  const shortestString = getTheShortestString(strings);
  const result = [];

  if (!isNextSymbolInString(shortestString, 0)) {
    const result = getAllSubstringsStartingFromSymbol(0, shortestString, strings);
    return result.length > 0 ? result[0] : '';
  }

  shortestString.split('').forEach((_, symbolIndex) => {
    result.push(getAllSubstringsStartingFromSymbol(symbolIndex, shortestString, strings));
  });

  if (result.every((arr) => arr.length === 0)) {
    return '';
  }

  return getTheLongestString(result.flat(Infinity));
};

const getAllSubstringsStartingFromSymbol = (startSymbolCursor, shortestString, strings) => {
  let lastSymbolCursor = startSymbolCursor;
  const foundSubstrings = [];
  let substring = shortestString.substring(startSymbolCursor, lastSymbolCursor + 1);
  while (isSubstringInAllStrings(substring, strings)) {
    foundSubstrings.push(substring);
    if (!isNextSymbolInString(shortestString, lastSymbolCursor)) {
      return foundSubstrings;
    }
    lastSymbolCursor = lastSymbolCursor + 1;
    substring = shortestString.substring(startSymbolCursor, lastSymbolCursor + 1);
  }
  return foundSubstrings;
};

const isSubstringInAllStrings = (subStr, strings) => {
  return strings.every((str) => str.includes(subStr));
};

const getTheLongestString = (strings) => {
  return strings.sort((a, b) => b.length - a.length)[0];
};

const getTheShortestString = (strings) => {
  const indexOfTheShortestString = 0;
  return strings.sort((a, b) => a.length - b.length)[indexOfTheShortestString];
};

const isNextSymbolInString = (str, curIndex) => {
  return str[curIndex + 1] ? true : false;
};
console.log(findShortestCommonSubstring(argv.slice(2)));
