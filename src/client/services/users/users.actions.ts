import { Dispatch } from 'redux';
import { IState, IUser, IErrors, IAction, ACTIONS } from './users.constants';
import axios from 'axios';

export const requestUser = (userId: string): IAction => ({
  type: ACTIONS.REQUEST_USER,
  payload: userId
})

export const receiveUser = (user: IUser): IAction => ({
  type: ACTIONS.RECEIVE_USER,
  payload: user
})

export const requestUsers = (filter: any): IAction => ({
  type: ACTIONS.REQUEST_USERS,
  payload: filter
})

export const receiveUsers = (users: Array<IUser>): IAction => ({
  type: ACTIONS.RECEIVE_USERS,
  payload: users
})

export const fetchUser = (userId: string): any => {
  return async (dispatch: Dispatch) => {
    dispatch(requestUser(userId));
    try {
      const res = await axios.get(`/api/users/${userId}`);
      const user = res.data;
      dispatch(receiveUser(user));
    } catch(e) {
      dispatch(setUsersErrors(e.response.data))
    }
  }
}

export const fetchUsers = (filter: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(requestUsers(filter));
    try {
      const res = await axios.get('/api/users', { params: filter });
      const users = res.data;
      dispatch(receiveUsers(users));
    } catch (e) {
      dispatch(setUsersErrors(e.response.data));
    }
  }
}

export const updateUser = (userId: string, data: IUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.put(`/api/users/${userId}`, data);
      const user = res.data;
      dispatch(receiveUser(user));
    } catch(e) {
      dispatch(setUsersErrors(e.response.data));
    }
  }
}

export const setUserOffline = (userId: string): IAction => ({
  type: ACTIONS.SET_USER_OFFLINE,
  payload: userId
})

export const deletedUser = (userId: string): IAction => ({
  type: ACTIONS.DELETE_USER,
  payload: userId
})

export const setUsersErrors = (errors: IErrors): IAction => ({
  type: ACTIONS.SET_USERS_ERRORS,
  payload: errors
})