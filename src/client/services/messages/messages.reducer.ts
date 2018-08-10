import { IState, IAction, ACTIONS } from './messages.constants';
import { Reducer } from 'redux';

export const INITIAL_STATE: IState = {
  messages: {}
}

const reducer: Reducer = (state: IState = INITIAL_STATE, action: IAction) => {
  switch(action.type) {
    case ACTIONS.RECEIVE_MESSAGE: {
      // action.payload = { from: id, to: id, content: string }
      state = {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.from]: [
            ...(state.messages[action.payload.from] ? state.messages[action.payload.from] : []),
            { ...action.payload }
          ]
        }
      }
      break;
    }
    case ACTIONS.SEND_MESSAGE: {
      // action.payload = { from: id, to: id, content: string }
      state = { 
        ...state, 
        messages: { 
          ...state.messages, 
          [action.payload.to]: [
            ...(state.messages[action.payload.to] ? state.messages[action.payload.to] : []),
            { ...action.payload }
          ] 
        }
      }
      break;
    }
    default: {}
  }

  return state;
}

export default reducer;