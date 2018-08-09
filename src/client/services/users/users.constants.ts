export interface IUser {
  _id: string,
  username: string,
  firstname?: string,
  lastname?: string,
  avatar?: string,
  createdAt: number,
  updatedAt: number
}

export interface IUsers {
  [key: string]: IUser
}

export interface IErrors {
  [key: string]: string
}

export interface IState {
  isFetching: boolean,
  users: IUsers | null,
  errors: IErrors | null
}

export interface IAction {
  type: string,
  payload: any
}

export const ACTIONS = {
  REQUEST_USER: 'REQUEST_USER',
  REQUEST_USERS: 'REQUEST_USERS',
  RECEIVE_USER: 'RECEIVE_USER',
  RECEIVE_USERS: 'RECEIVE_USERS',
  DELETE_USER: 'DELETE_USER',
  SET_USERS_ERRORS: 'SET_USERS_ERRORS'
}