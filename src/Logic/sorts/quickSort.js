import { swap } from '../helpers';

const quickSortHelper = (array, startIndex, endIndex, phases) => {
  if (startIndex >= endIndex) {
    return;
  }

  const pivotIndex = startIndex; // we choose pivot to always be the start index
  const pivotValue = array[pivotIndex];
  let leftIndex = startIndex + 1;
  let rightIndex = endIndex;

  while (rightIndex >= leftIndex) {
    if (array[leftIndex] > pivotValue && array[rightIndex] < pivotValue) {
      swap(leftIndex, rightIndex, array);
      phases.push([...array]);
    }

    if (array[leftIndex] <= pivotValue) {
      leftIndex++;
    }

    if (array[rightIndex] >= pivotValue) {
      rightIndex--;
    }
  }

  // we just swapped all values according to pivot
  // swap pivot with right
  swap(pivotIndex, rightIndex, array);
  phases.push([...array]);

  const isLeftSubArraySorted =
    rightIndex - startIndex - 1 < endIndex - rightIndex + 1;

  if (isLeftSubArraySorted) {
    quickSortHelper(array, startIndex, rightIndex - 1, phases);
    quickSortHelper(array, rightIndex + 1, endIndex, phases);
  } else {
    quickSortHelper(array, rightIndex + 1, endIndex, phases);
    quickSortHelper(array, startIndex, rightIndex - 1, phases);
  }
};

export const quickSort = unsortedArray => {
  const phases = [];
  const startIndex = 0;
  const endIndex = unsortedArray.length - 1;
  quickSortHelper(unsortedArray, startIndex, endIndex, phases);
  return phases;
};
