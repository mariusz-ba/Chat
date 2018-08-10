import * as React from 'react';
import { render } from 'react-dom';
import App from './app';

import { Provider } from 'react-redux';
import store from './store';

import * as jwt from 'jsonwebtoken';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './services/auth/auth.actions';

import Socket from 'services/sockets/socket';

const token = localStorage.getItem('jwtToken');

if(token) {
  setAuthorizationToken(token);
  const decoded = jwt.decode(token);
  store.dispatch(setCurrentUser(decoded));
  // Create socket
  const socket = Socket.getInstance((decoded as any)._id);
}

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app')
);