import { IState, IAction, ACTIONS } from './users.constants';
import { Reducer } from 'redux';
import mapKeys = require('lodash/mapKeys');
import omit = require('lodash/omit');

export const INITIAL_STATE: IState = {
  isFetching: false,
  users: null,
  errors: null
}

const reducer: Reducer = (state: IState = INITIAL_STATE, action: IAction) => {
  switch(action.type) {
    case ACTIONS.REQUEST_USER:
    case ACTIONS.REQUEST_USERS:
      return { ...state, isFetching: true };
    case ACTIONS.RECEIVE_USER:
      return { ...state, users: { ...state.users, [action.payload._id]: action.payload }};
    case ACTIONS.RECEIVE_USERS:
      return { ...state, users: mapKeys(action.payload, '_id')};
    case ACTIONS.SET_USER_OFFLINE:
      return { ...state, users: { ...state.users, [action.payload]: { ...state.users[action.payload], online: false }}}
    case ACTIONS.DELETE_USER:
      return { ...state, users: omit(state.users, action.payload) };
    case ACTIONS.SET_USERS_ERRORS:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
}

export default reducer;