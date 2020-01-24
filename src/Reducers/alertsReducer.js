import { ALERTS_ACTIONS } from '../Actions/actions';

const initialState = {
  alertList: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ALERTS_ACTIONS.ALERTS_SUCCESS:
      return { ...state, alertList: [...state.alertList, action.payload] };
    case ALERTS_ACTIONS.ALERTS_FAILURE:
      return { ...state, alertList: [...state.alertList, action.payload] };
    case ALERTS_ACTIONS.ALERTS_RESET:
      return { ...state, alertList: [] };
    default:
      return state;
  }
}
