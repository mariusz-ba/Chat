import { IMessage, IAction, ACTIONS } from './messages.constants';

export const receiveMessage = (message: IMessage): IAction => ({
  type: ACTIONS.RECEIVE_MESSAGE,
  payload: message
})

export const sendMessage = (message: IMessage): IAction => ({
  type: ACTIONS.SEND_MESSAGE,
  payload: message
})