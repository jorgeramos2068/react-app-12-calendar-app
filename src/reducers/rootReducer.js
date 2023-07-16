import { combineReducers } from 'redux';
import authReducer from './authReducer';
import calendarReducer from './calendarReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  calendar: calendarReducer,
  ui: uiReducer,
});

export default rootReducer;
