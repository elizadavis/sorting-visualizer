import { ALERTS_ACTIONS } from 'Actions/actions';

export const MESSAGES = {
  SIZE_OVERFLOW: {
    type: ALERTS_ACTIONS.ALERTS_ADD,
    payload: {
      heading: 'Warning',
      message: 'Please enter less than 100 items',
      variant: 'warning',
    },
  },
  ONE_VALUE: {
    type: ALERTS_ACTIONS.ALERTS_ADD,
    payload: {
      heading: 'Warning',
      message: 'Please enter more than one value',
      variant: 'warning',
    },
  },
  MAX_OVERFLOW: {
    type: ALERTS_ACTIONS.ALERTS_ADD,
    payload: {
      heading: 'Warning',
      message: 'Please enter values that are less than 100',
      variant: 'warning',
    },
  },
  ONLY_NUMBERS: {
    type: ALERTS_ACTIONS.ALERTS_ADD,
    payload: {
      heading: 'Warning',
      message: 'Please enter values that are numbers',
      variant: 'warning',
    },
  },
  DEFAULT: {
    type: ALERTS_ACTIONS.ALERTS_ADD,
    payload: {
      heading: 'Warning',
      message: 'Please enter values in the format [1,5,3,2] or 1, 5, 3, 2',
      variant: 'warning',
    },
  },
};
