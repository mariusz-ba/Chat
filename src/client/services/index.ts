import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import usersReducer from './users/users.reducer';
import messagesReducer from './messages/messages.reducer';

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  messages: messagesReducer
})