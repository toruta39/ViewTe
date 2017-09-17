import { combineReducers } from 'redux';
import browser from './browser';
import panel from './panel';

export default combineReducers({
  browser,
  panel
});
