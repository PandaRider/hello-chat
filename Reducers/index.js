import { combineReducers } from 'redux';
import auth from './auth_reducer';
import profile from './profile_reducer';
import messages from './chat_reducer';

export default combineReducers({
  // auth: () => { return {} }
  auth,
  profile,
  messages
});
