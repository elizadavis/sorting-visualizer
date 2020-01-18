import { swap } from '../helpers';

export const bubbleSort = unsortedArray => {
  let isSorted = false;
  let lastUnsorted = unsortedArray.length - 1;
  const phases = [];
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < lastUnsorted; i++) {
      if (unsortedArray[i] > unsortedArray[i + 1]) {
        swap(i, i + 1, unsortedArray);
        isSorted = false;
        phases.push([...unsortedArray]);
      }
    }
    lastUnsorted--;
  }
  return phases;
};
