import { combineReducers } from 'redux';
import usersReducer from './users';
import authReducer from './auth';

export default combineReducers({
  users: usersReducer,
  auth: authReducer,
});
