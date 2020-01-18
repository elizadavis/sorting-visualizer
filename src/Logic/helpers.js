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
  let temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
};
