export interface IMessage {
  from: string,
  to: string,
  content: string
}

export interface IMessageObject {
  [key: string]: Array<IMessage>
}

export interface IState {
  messages: IMessageObject
}

export interface IAction {
  type: string,
  payload: any
}

export const ACTIONS = {
  SEND_MESSAGE: 'SEND_MESSAGE',
  RECEIVE_MESSAGE: 'RECEIVE_MESSAGE'
}