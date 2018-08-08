import * as React from 'react';
import styled from 'styled-components';

import Group from './group';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

interface IProps {
  children: any
}

export default class Form extends React.Component<IProps> {
  static Group = Group;
  
  render() {
    return (
      <StyledForm>
        {this.props.children}
      </StyledForm>
    )
  }
}