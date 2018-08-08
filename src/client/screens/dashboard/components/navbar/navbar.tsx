import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`

`

// User avatar and name
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: .7rem;
`

const Title = styled.h1`
  font-size: 1em;
  font-weight: 700;
  margin-bottom: .3rem;
`

const Subtitle = styled.h2`
  font-size: .875em;
  font-weight: 700;
  color: rgba(0, 0, 0, .125);
`


// Navigation list
const List = styled.ul`
  list-style-type: none;

  li {
    &:first-of-type { border-top: 1px solid rgba(0, 0, 0, .125); }
    border-bottom: 1px solid rgba(0, 0, 0, .125);
  }
`

const Item = styled(Link)`
  display: grid;
  grid-template-columns: 1rem auto;
  grid-column-gap: 1rem;

  text-decoration: none;
  padding: 1.5rem 1rem;
  color: #000;

  &:hover {
    cursor: pointer;
    background: #fafafa;
  }
`

const Icon = styled.span`
  align-self: center;
`

const Text = styled.span`
  align-self: center;
  font-size: .875em;
  font-weight: bold;
`


// Sign out button
const Footer = styled.div`

`

export default () => (
  <Nav>
    <Header>
      <Avatar src="https://i1.wp.com/grueneroadpharmacy.com/wp-content/uploads/2017/02/user-placeholder-1.jpg?ssl=1" alt="Avatar"/>
      <Title>Mariusz Baran</Title>
      <Subtitle>@mariusz</Subtitle>
    </Header>
    <List>
      <li><Item to="/"><Icon className="fas fa-comments"></Icon><Text>Chat</Text></Item></li>
      <li><Item to="/profile"><Icon className="fas fa-user"></Icon><Text>Profile</Text></Item></li>
      <li><Item to="/settings"><Icon className="fas fa-cogs"></Icon><Text>Settings</Text></Item></li>
    </List>
  </Nav>
)