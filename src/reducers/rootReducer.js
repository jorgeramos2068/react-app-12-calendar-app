import { combineReducers } from 'redux';
import calendarReducer from './calendarReducers';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  calendar: calendarReducer,
  ui: uiReducer,
});

export default rootReducer;
