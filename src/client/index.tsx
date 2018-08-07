import * as React from 'react';
import { render } from 'react-dom';
import App from './app';

import { Provider } from 'react-redux';
import store from './store';

import * as jwt from 'jsonwebtoken';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './services/auth/auth.actions';

const token = localStorage.getItem('jwtToken');

if(token) {
  setAuthorizationToken(token);
  store.dispatch(setCurrentUser(jwt.decode(token)));
}

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app')
);