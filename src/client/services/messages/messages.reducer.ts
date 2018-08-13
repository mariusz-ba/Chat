import { IState, IAction, ACTIONS } from './messages.constants';
import { Reducer } from 'redux';

export const INITIAL_STATE: IState = {
  messages: {},
  errors: null
}

const reducer: Reducer = (state: IState = INITIAL_STATE, action: IAction) => {
  switch(action.type) {
    case ACTIONS.RECEIVE_MESSAGES: {
      state = { ...state, messages: action.payload }
      break;
    }
    case ACTIONS.RECEIVE_MESSAGE: {
      // action.payload = { from: id, to: id, content: string }
      let messages = {};
      if(state.messages[action.payload.from])
        messages = { 
          ...state.messages[action.payload.from],
          items: [
            ...(Array.isArray(state.messages[action.payload.from].items) ? state.messages[action.payload.from].items : []),
            { ...action.payload }
          ]
        }
      else
        messages = {
          items: [{ ...action.payload }]
        }

      state = {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.from]: messages
        }
      }
      break;
    }
    case ACTIONS.SEND_MESSAGE: {
      // action.payload = { from: id, to: id, content: string }
      let messages = {};
      if(state.messages[action.payload.to])
        messages = { 
          ...state.messages[action.payload.to],
          items: [
            ...(Array.isArray(state.messages[action.payload.to].items) ? state.messages[action.payload.to].items : []),
            { ...action.payload }
          ]
        }
      else
        messages = {
          items: [{ ...action.payload }]
        }

      state = { 
        ...state, 
        messages: { 
          ...state.messages, 
          [action.payload.to]: messages
        }
      }
      break;
    }
    case ACTIONS.SET_MESSAGES_ERRORS: {
      state = { ...state, errors: action.payload };
      break;
    }
    case ACTIONS.START_TYPING: {
      state = {
        ...state,
        messages: {
          ...state.messages,
          [action.payload]: {
            ...state.messages[action.payload],
            isTyping: true
          }
        }
      }
      break;
    }
    case ACTIONS.STOP_TYPING: {
      state = {
        ...state,
        messages: {
          ...state.messages,
          [action.payload]: {
            ...state.messages[action.payload],
            isTyping: false
          }
        }
      }
      break;
    }
    default: {}
  }

  return state;
}

export default reducer;