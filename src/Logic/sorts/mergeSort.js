import _ from 'lodash';
import uniqueKey from 'unique-key';
import { swap } from '../helpers';

export const mergeSort = unsortedArray => {
  const changes = [];
  const input = _.map(unsortedArray, (value, index) => ({
    value,
    index,
    uniqueKey: uniqueKey(),
  }));
  simulateMergeSort(input, changes);
  const phases = simulateMergeSortChanges(changes, [...input]);
  return phases;
};

function simulateMergeSort(unsortedArray, changes) {
  // does a merge sort
  // keep track of unique keys associated with each array element
  // keeps track of specific sub array that merge sort is processing
  // swaps on elements on the fly inside of sub array
  // pushes changes onto changes
  // simula
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }

  const middle = Math.floor(unsortedArray.length / 2);
  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);

  return simulateMergeSortHelper(
    simulateMergeSort(left, changes),
    simulateMergeSort(right, changes),
    changes,
  );
}

function simulateMergeSortHelper(left, right, changes) {
  // @todo: refactor while loop
  let leftIndex = 0;
  let rightIndex = 0;
  let subArrayIndex = 0;
  let copy = [...left, ...right];

  const output = [];

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].value < right[rightIndex].value) {
      const data = {
        itemToSwap: left[leftIndex],
        mostLeftItemToReplace: copy[subArrayIndex],
        log: `swap ${left[leftIndex].value} with ${copy[subArrayIndex].value}`,
      };

      if (data.itemToSwap.uniqueKey !== data.mostLeftItemToReplace.uniqueKey) {
        changes.push(data);
      }
      output.push(left[leftIndex]);
      const swapIndex = _.findIndex(
        copy,
        item => item.uniqueKey === data.itemToSwap.uniqueKey,
      );

      swap(swapIndex, subArrayIndex, copy);
      leftIndex++;
      subArrayIndex++;
    } else {
      const data = {
        itemToSwap: right[rightIndex],
        mostLeftItemToReplace: copy[subArrayIndex],
        log: `swap ${right[rightIndex].value} with ${copy[subArrayIndex].value}`,
      };
      changes.push(data);
      output.push(right[rightIndex]);
      const swapIndex = _.findIndex(
        copy,
        item => item.uniqueKey === data.itemToSwap.uniqueKey,
      );

      swap(swapIndex, subArrayIndex, copy);
      rightIndex++;
      subArrayIndex++;
    }
  }

  return [...output, ...left.slice(leftIndex), ...right.slice(rightIndex)];
}

function simulateMergeSortChanges(changes, array) {
  const phases = [];
  _.each(changes, change => {
    // find corresponding item in array
    const keysToFind = {
      mostLeftItemToReplace: change.mostLeftItemToReplace.uniqueKey,
      itemToSwap: change.itemToSwap.uniqueKey,
    };

    const availableLeftIndex = _.findIndex(
      array,
      item => item.uniqueKey === keysToFind.mostLeftItemToReplace,
    );

    const replacedIndex = _.findIndex(
      array,
      item => item.uniqueKey === keysToFind.itemToSwap,
    );

    swap(availableLeftIndex, replacedIndex, array);

    phases.push([..._.map(array, ({ value }) => value)]);
  });

  return phases;
}
