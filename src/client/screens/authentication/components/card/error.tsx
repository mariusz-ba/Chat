import * as React from 'react';
import styled from 'styled-components';

const StyledError = styled.p`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 3px;
  background: #dc3545;
  color: rgba(0, 0, 0, .8);
`

interface IProps {
  message: string
}

const Error = (props: IProps) => {
  return (
    <StyledError>
      {props.message}
    </StyledError>
  )
}

export default Error;