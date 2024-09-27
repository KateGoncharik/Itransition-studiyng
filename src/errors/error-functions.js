const deleteChar = (str, rng) => {
  if (str.length === 0) return str;
  const index = Math.floor(rng() * str.length);
  return str.slice(0, index) + str.slice(index + 1);
};

const addRandomChar = (str, rng) => {
  if (str.length === 0) return str;
  const randomPos = Math.floor(rng() * str.length);
  const randomChar = String.fromCharCode(97 + Math.floor(rng() * 26));
  return str.slice(0, randomPos) + randomChar + str.slice(randomPos);
};

const swapAdjacentChars = (str, rng) => {
  if (str.length < 2) return str;
  const index = Math.floor(rng() * (str.length - 1));
  return (
    str.slice(0, index) +
    str.charAt(index + 1) +
    str.charAt(index) +
    str.slice(index + 2)
  );
};
export { swapAdjacentChars, addRandomChar, deleteChar };
