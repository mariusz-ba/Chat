import * as React from 'react';
import styled from 'styled-components';

import Title from './title';
import Error from './error';

const StyledCard = styled.div`
  max-width: 500px;
  min-width: 300px;
  margin: 0 2rem;
  background: white;
  box-shadow: 0 0 6px #5d5d5d;
  border-radius: 5px;
  padding: 2rem;
`

interface IProps {
  children: any
}

export default class Card extends React.Component<IProps> {
  static Title = Title;
  static Error = Error;

  render() {
    return (
      <StyledCard>
        {this.props.children}
      </StyledCard>
    )
  }
}