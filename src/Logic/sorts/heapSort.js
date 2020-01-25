import { swap } from '../helpers';

export const heapSort = input => {
  let currentLength = input.length;
  const phases = [];

  for (let index = Math.floor(currentLength / 2); index >= 0; index -= 1) {
    heapify(input, index, currentLength, phases);
  }

  for (let index = currentLength - 1; index > 0; index--) {
    swap(0, index, input);
    phases.push([...input]);
    currentLength--;
    heapify(input, 0, currentLength, phases);
  }

  return phases;
};

function heapify(input, index, length, phases) {
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
    phases.push([...input]);
    heapify(input, max, length, phases);
  }
}
