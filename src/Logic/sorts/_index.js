import { bubbleSort } from './bubbleSort';
import { mergeSort } from './mergeSort';
import { insertionSort } from './insertionSort';
import { heapSort } from './heapSort';
import { quickSort } from './quickSort';

export const sorts = {
  BUBBLE_SORT: bubbleSort,
  MERGE_SORT: mergeSort,
  QUICK_SORT: quickSort,
  HEAP_SORT: heapSort,
  INSERTION_SORT: insertionSort,
};
