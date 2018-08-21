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
    case ACTIONS.REQUEST_SIGNIN:
      return { ...state, isFetching: true };
    case ACTIONS.SET_CURRENT_USER:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        errors: null
      }
    case ACTIONS.SET_AUTH_ERRORS:
      return { ...state, isFetching: false, errors: action.payload };
    case ACTIONS.SIGNOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default reducer;