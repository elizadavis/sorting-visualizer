import { SETTINGS_ACTIONS } from 'Actions/actions';
import { DEFAULTS } from 'Store/constants';

const initialState = {
  size: DEFAULTS.SIZE,
  delay: DEFAULTS.DELAY,
  showValues: DEFAULTS.SHOW_VALUES,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_ACTIONS.UPDATE_SIZE:
      return {
        ...state,
        size: action.payload,
      };
    case SETTINGS_ACTIONS.UPDATE_DELAY:
      return {
        ...state,
        delay: action.payload,
      };
    case SETTINGS_ACTIONS.TOGGLE_SHOW_VALUES:
      return {
        ...state,
        showValues: !state.showValues,
      };
    default:
      return state;
  }
}
