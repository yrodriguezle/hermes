import { combineReducers } from '@reduxjs/toolkit';
import inProgress from './reducers/inProgress';
import settings from './reducers/settings';
import user from './reducers/user';

const rootReducer = combineReducers({
  inProgress,
  settings,
  user,
});

export default rootReducer;
