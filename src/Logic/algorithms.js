import _ from 'lodash';
import uniqueKey from 'unique-key';

const bubbleSort = unsortedArray => {
  let isSorted = false;
  let lastUnsorted = unsortedArray.length - 1;
  const phases = [];
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < lastUnsorted; i++) {
      if (unsortedArray[i] > unsortedArray[i + 1]) {
        swap(i, i + 1, unsortedArray);
        isSorted = false;
      }
      phases.push([...unsortedArray]);
    }
    lastUnsorted--;
  }
  return phases;
};

function mergeSort(numbers) {
  const changes = [];
  const input = _.map(numbers, (value, index) => ({
    value,
    index,
    uniqueKey: uniqueKey(),
  }));
  simulateMergeSort(input, changes);
  const phases = simulateMergeSortChanges(changes, [...input]);
  return phases;
}

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
      changes.push(data);
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

const quickSort = unsortedArray => {
  // @todo

  return [unsortedArray];
};

const heapSort = unsortedArray => {
  // @todo

  return [unsortedArray];
};

const insertionSort = unsortedArray => {
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

function swap(indexA, indexB, array) {
  let temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
}

export const sorts = {
  BUBBLE_SORT: bubbleSort,
  MERGE_SORT: mergeSort,
  QUICK_SORT: quickSort,
  HEAP_SORT: heapSort,
  INSERTION_SORT: insertionSort,
};
