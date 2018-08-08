import * as React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h2`
  text-align: center;
  font-size: 1.7em;
  font-weight: 900;
`

interface IProps {
  text: string
}

const Title = (props: IProps) => {
  return (
    <StyledTitle>
      {props.text}
    </StyledTitle>
  )
}

export default Title;