import reducer, { INITIAL_STATE } from './users.reducer';
import { ACTIONS as actions, IUser } from './users.constants';
import * as assert from 'assert';
import mapKeys = require('lodash/mapKeys');

const user: IUser = {
  _id: "123",
  username: 'john',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  online: true
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
    const action = {
      type: actions.RECEIVE_USER,
      payload: user
    }
    const state = reducer({}, action);
    assert.equal(state.users[user._id], action.payload);
    const action2 = {
      type: actions.DELETE_USER,
      payload: user._id
    }
    assert.equal(JSON.stringify(reducer(state, action2).users), JSON.stringify({}));
  });

  it('should handle SET_USER_OFFLINE', () => {
    const action = {
      type: actions.RECEIVE_USER,
      payload: user
    }
    const state = reducer({}, action);
    assert.equal(state.users[user._id], action.payload);
    const action2 = {
      type: actions.SET_USER_OFFLINE,
      payload: user._id
    }
    assert.equal(reducer(state, action2).users[user._id].online, false);
  });

  it('should handle SET_USERS_ERRORS', () => {
    const action = {
      type: actions.SET_USERS_ERRORS,
      payload: { name: 'error' }
    }
    assert.equal(reducer({}, action).errors, action.payload);
  });
})