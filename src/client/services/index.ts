import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import usersReducer from './users/users.reducer';

export default combineReducers({
  auth: authReducer,
  users: usersReducer
})