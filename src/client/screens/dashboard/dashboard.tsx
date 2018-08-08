import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './components/navbar/navbar';
import Chat from './screens/chat/chat';
import Profile from './screens/profile/profile';
import Settings from './screens/settings/settings';

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 200px auto;
`

const Sidebar = styled.aside`
  border-right: 1px solid rgba(0, 0, 0, .125);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
  &::-webkit-scrollbar-thumb {
    background: #a0a0a0;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #707070;
  }
`

const Main = styled.main`
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
  &::-webkit-scrollbar-thumb {
    background: #a0a0a0;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #707070;
  }
`

export default (props: any) => (
  <Container>
    <Sidebar>
      <Navbar/>
    </Sidebar>
    <Main>
      <Switch>
        <Route exact path="/" component={Chat}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/settings" component={Settings}/>
      </Switch>
    </Main>
  </Container>
)