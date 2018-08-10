import reducer, { INITIAL_STATE } from './users.reducer';
import { ACTIONS as actions, IUser } from './users.constants';
import * as assert from 'assert';
import mapKeys = require('lodash/mapKeys');

const user: IUser = {
  _id: "123",
  username: 'john',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  online: false
}

const users: Array<IUser> = [user];

describe('users reducer', function() {
  it('should return the initial state', () => {
    assert.equal(reducer(undefined, ({} as any)), INITIAL_STATE);
  });

  it('should handle REQUEST_USER', () => {
    const action = {
      type: actions.REQUEST_USER,
      payload: {}
    }
    assert.equal(reducer({}, action).isFetching, true);
  });

  it('should handle REQUEST_USERS', () => {
    const action = {
      type: actions.REQUEST_USERS,
      payload: {}
    }
    assert.equal(reducer({}, action).isFetching, true);
  });

  it('should handle RECEIVE_USER', () => {
    const action = {
      type: actions.RECEIVE_USER,
      payload: user
    }
    assert.equal(reducer({}, action).users[user._id], action.payload);
  });

  it('should handle RECEIVE_USERS', () => {
    const action = {
      type: actions.RECEIVE_USERS,
      payload: users
    }
    assert.equal(JSON.stringify(reducer({}, action).users), JSON.stringify(mapKeys(action.payload, '_id')));
  });

  it('should handle DELETE_USER', () => {
    let state;
    const action = {
      type: actions.RECEIVE_USER,
      payload: user
    }
    assert.equal(state = reducer({}, action).users[user._id], action.payload);
    const action2 = {
      type: actions.DELETE_USER,
      payload: user._id
    }
    assert.equal(JSON.stringify(reducer(state, action2).users), JSON.stringify({}));
  });

  it('should handle SET_USERS_ERRORS', () => {
    const action = {
      type: actions.SET_USERS_ERRORS,
      payload: { name: 'error' }
    }
    assert.equal(reducer({}, action).errors, action.payload);
  });
})