import {combineReducers} from 'redux';

import chat from './chat';
import user from './user';
import research from './research';

export default combineReducers({
  chat,
  user,
  research,
});