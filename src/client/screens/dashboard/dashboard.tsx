import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/navbar';
import Chat from './screens/chat/chat';
import Profile from './screens/profile/profile';
import Settings from './screens/settings/settings';

const styles = require('./dashboard.scss');

export default (props: any) => (
  <div className={styles.dashboard}>
    <aside className={styles.sidebar}>
      <Navbar/>
    </aside>
    <main className={styles.main}>
      <Switch>
        <Route exact path="/" component={Chat}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/settings" component={Settings}/>
      </Switch>
    </main>
  </div>
)