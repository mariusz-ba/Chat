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
    case ACTIONS.REQUEST_USERS: {
      state = { ...state, isFetching: true };
      break;
    }
    case ACTIONS.RECEIVE_USER: {
      state = { ...state, users: { ...state.users, [action.payload._id]: action.payload }};
      break;
    }
    case ACTIONS.RECEIVE_USERS: {
      state = { ...state, users: mapKeys(action.payload, '_id')};
      break;
    }
    case ACTIONS.DELETE_USER: {
      state = { ...state, users: omit(state.users, action.payload) };
      break;
    }
    case ACTIONS.SET_USERS_ERRORS: {
      state = { ...state, errors: action.payload };
      break;
    }
  }
  return state;
}

export default reducer;