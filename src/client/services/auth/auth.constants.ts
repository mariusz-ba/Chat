export interface IState {
  isFetching: boolean,
  isAuthenticated: boolean,
  user: any,
  errors: any
}

export interface IAction {
  type: string
  payload: any
}

export const ACTIONS = {
  REQUEST_SIGNIN: 'REQUEST_SIGNIN',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_AUTH_ERRORS: 'SET_AUTH_ERRORS',
  SIGNOUT: 'SIGNOUT'
}
