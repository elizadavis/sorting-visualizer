import { combineReducers } from 'redux';
import settings from './settingsReducer';
import alerts from './alertsReducer';

export default combineReducers({
  settings,
  alerts,
});
