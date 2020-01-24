import { swap } from '../helpers';

export function heapSort(input) {
  let currentLength = input.length;
  const phases = [];

  for (let index = Math.floor(currentLength / 2); index >= 0; index -= 1) {
    heapify(input, index, currentLength);
  }

  for (let index = currentLength - 1; index > 0; index--) {
    swap(0, index, input);
    phases.push([...input]);
    currentLength--;
    heapify(input, 0, currentLength);
  }

  return phases;
}

function heapify(input, index, length) {
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  let max = index;

  if (left < length && input[left] > input[max]) {
    max = left;
  }

  if (right < length && input[right] > input[max]) {
    max = right;
  }

  if (max !== index) {
    swap(index, max, input);
    heapify(input, max, length);
  }
}
