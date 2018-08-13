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
      state = {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.from]: {
            ...state.messages[action.payload.from],
            items: [
              ...state.messages[action.payload.from].items,
              { ...action.payload }
            ]
            //...(state.messages[action.payload.from] ? state.messages[action.payload.from] : []),
            //{ ...action.payload }
          }
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
          [action.payload.to]: {
            //...(state.messages[action.payload.to] ? state.messages[action.payload.to] : []),
            //{ ...action.payload }
            ...state.messages[action.payload.to],
            items: [
              ...state.messages[action.payload.to].items,
              { ...action.payload }
            ]
          }
        }
      }
      break;
    }
    case ACTIONS.SET_MESSAGES_ERRORS: {
      state = { ...state, errors: action.payload };
      break;
    }
    default: {}
  }

  return state;
}

export default reducer;