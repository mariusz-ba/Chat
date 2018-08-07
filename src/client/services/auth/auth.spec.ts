import reducer, { INITIAL_STATE } from './auth.reducer';
import { ACTIONS as actions } from './auth.constants';
import * as assert from 'assert';

describe('auth reducer', function() {
  it('should return the initial state', () => {
    assert.equal(reducer(undefined, ({} as any)), INITIAL_STATE);
  });

  it('should handle REQUEST_SIGNIN', () => {
    const action = {
      type: actions.REQUEST_SIGNIN,
      payload: { identifier: 'john', password: 'doe'}
    }
    assert.equal(reducer({}, action).isFetching, true);
  });

  it('should handle SET_CURRENT_USER', () => {
    const action = {
      type: actions.SET_CURRENT_USER,
      payload: { id: 1, username: 'john' }
    }
    assert.equal(reducer({}, action).user, action.payload);
  });

  it('should handle SET_AUTH_ERRORS', () => {
    const action = {
      type: actions.SET_AUTH_ERRORS,
      payload: { one: 'two' }
    }
    assert.equal(reducer({}, action).errors, action.payload);
  });

  it('should handle SIGNOUT', () => {
    const action = {
      type: actions.SIGNOUT
    }
    assert.equal(reducer({}, action), INITIAL_STATE);
  });
})