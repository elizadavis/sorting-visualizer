import { SETTINGS_ACTIONS } from '../Actions/actions';
import { DEFAULTS } from '../constants';

const initialState = {
  size: DEFAULTS.SIZE,
  delay: DEFAULTS.DELAY,
  isValueVisible: DEFAULTS.IS_VALUE_VISIBLE,
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
    case SETTINGS_ACTIONS.TOGGLE_IS_VALUE_VISIBLE:
      return {
        ...state,
        isValueVisible: !state.isValueVisible,
      };
    default:
      return state;
  }
}
