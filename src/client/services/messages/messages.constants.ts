export interface IMessage {
  from: string,
  to: string,
  content: string
}

export interface IMessageObject {
  [key: string]: Array<IMessage>
}

export interface IErrors {
  [key: string]: string
}

export interface IState {
  messages: IMessageObject,
  errors: IErrors | null
}

export interface IAction {
  type: string,
  payload: any
}

export const ACTIONS = {
  SEND_MESSAGE: 'SEND_MESSAGE',
  RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
  RECEIVE_MESSAGES: 'RECEIVE_MESSAGES',
  SET_MESSAGES_ERRORS: 'SET_MESSAGES_ERRORS'
}