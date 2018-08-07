import * as React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <h1>Landing page</h1>
    <Link to="/signup">Sign up</Link>
    <Link to="/signin">Sign in</Link>
  </div>
)