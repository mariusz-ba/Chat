import { IState, IAction, ACTIONS } from './auth.constants';
import { Reducer } from 'redux';
import isEmpty = require('lodash/isEmpty');

export const INITIAL_STATE: IState = {
  isFetching: false,
  isAuthenticated: false,
  user: null,
  errors: null
}

const reducer: Reducer = (state: IState = INITIAL_STATE, action: IAction) => {
  switch(action.type) {
    case ACTIONS.REQUEST_SIGNIN: {
      state = { ...state, isFetching: true };
      break;
    }
    case ACTIONS.SET_CURRENT_USER: {
      state = {
        ...state,
        isFetching: false,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        errors: null
      }
      break;
    }
    case ACTIONS.SET_AUTH_ERRORS: {
      state = { ...state, isFetching: false, errors: action.payload };
      break;
    }
    case ACTIONS.SIGNOUT: {
      state = INITIAL_STATE;
      break;
    }
    default: {}
  }
  
  return state;
}

export default reducer;