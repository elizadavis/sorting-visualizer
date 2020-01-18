import _ from 'lodash';

export const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateRandomArray = (size, min, max) => {
  const array = [];

  _.times(size, () => {
    array.push(randomIntFromInterval(min, max));
  });

  return array;
};

export const arraysAreEqual = (arrayOne, arrayTwo) => {
  return _.isEqual(arrayOne, arrayTwo);
};

export const nameToString = name => {
  const str = name
    .toLowerCase()
    .split('_')
    .join(' ');
  return str;
};

export const swap = (indexA, indexB, array) => {
  if (typeof indexA !== 'number' || typeof indexB !== 'number') {
    throw new Error('argument indexA or indexB is not a number');
  }

  if (!Array.isArray(array)) {
    throw new Error('argument array is not an array');
  }

  let temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
};
