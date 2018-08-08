import * as React from 'react';
import styled from 'styled-components';

const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  &:first-of-type { margin-top: 1rem; }
  margin-bottom: 1rem;

  label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 6px;
    color: #2d2d2d;
  }

  input {
    outline: 0;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: 3px;
    font-size: 1em;
    padding: .5rem;

    box-shadow: ${(props: any) => props.error ? '0 0 2px 1px #dc3545' : 'none'};
  }

  small {
    margin-top: .5rem;
    color: #dc3545;
    font-weight: bold;
  }
`

interface IProps {
  children: any,
  error?: string
}

const Group = (props: IProps) => {
  return (
    <StyledGroup {...props}>
      {props.children}
    </StyledGroup>
  )
}

export default Group;