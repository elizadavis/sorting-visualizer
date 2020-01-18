import { swap } from '../helpers';

export const insertionSort = unsortedArray => {
  const phases = [];
  let indexStart = 1;
  while (indexStart < unsortedArray.length) {
    let indexEnd = indexStart;
    while (
      indexEnd > 0 &&
      unsortedArray[indexEnd] < unsortedArray[indexEnd - 1]
    ) {
      swap(indexEnd, indexEnd - 1, unsortedArray);
      indexEnd = indexEnd - 1;
      phases.push([...unsortedArray]);
    }
    indexStart++;
  }
  return phases;
};
