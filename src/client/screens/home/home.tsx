import * as React from 'react';
import Dashboard from '../dashboard/dashboard';
import Landing from '../landing/landing';

const isAuthenticated = false;

export default () => {
  if(isAuthenticated)
    return <Dashboard/>
  return <Landing/>
}