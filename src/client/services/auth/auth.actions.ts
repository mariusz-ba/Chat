import { Dispatch } from 'redux';
import { IState, IAction, ACTIONS } from './auth.constants';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

export interface ICredentials {
  identifier: string,
  password: string
}

export const requestSignin = (credentials: ICredentials): IAction => ({
  type: ACTIONS.REQUEST_SIGNIN,
  payload: credentials
})

export const setCurrentUser = (user: IState['user']): IAction => ({
  type: ACTIONS.SET_CURRENT_USER,
  payload: user
})

export const setAuthErrors = (errors: IState['errors']): IAction => ({
  type: ACTIONS.SET_AUTH_ERRORS,
  payload: errors
})

export const signIn = (credentials: ICredentials) => {
  return async (dispatch: Dispatch) => {
    dispatch(requestSignin(credentials));
    try {
      const res = await axios.post('/api/users/auth', credentials);
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    } catch (e) {
      dispatch(setAuthErrors(e.response.data.errors));
    }
    return Promise.resolve();
  }
}

export const onSignOut = (): IAction => ({
  type: ACTIONS.SIGNOUT,
  payload: null
})

export const signOut = () => {
  return (dispatch: Dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(null);
    dispatch(onSignOut());
    return Promise.resolve();
  }
}