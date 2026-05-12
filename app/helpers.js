// Shuffle an array! And return a new one. Used for shuffling buttons.
export const shuffle = (initArr) => {
  const a = [...initArr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const alphaSortOnKey = (key) => (a, b) => {
  const strA = a[key].toUpperCase();
  const strB = b[key].toUpperCase();
  if (strA < strB) return -1;
  if (strA > strB) return 1;
  return 0;
};
