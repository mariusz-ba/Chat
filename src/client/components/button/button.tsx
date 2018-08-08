import * as React from 'react';
import styled, { StyledFunction } from 'styled-components';

interface IButton {
  mode?: string
}

const button: StyledFunction<IButton & React.HTMLProps<HTMLButtonElement>> = styled.button;

const Button = button`
  outline: 0;
  border: 0;
  border-radius: 3px;
  padding: .5rem 1rem;
  transition: background linear .125s;

  color: ${
    props => props.mode ?
      colors[props.mode].color :
      colors['light'].color
  };

  background: ${ 
    props  => props.mode ? 
      colors[props.mode].background : 
      colors['light'].background 
  };

  &:hover {
    cursor: pointer;
    background: ${ 
      props => props.mode ? 
        colors[props.mode].hover : 
        colors['light'].hover
    };
  }
`

interface IColors {
  [mode: string]: any
}

const colors: IColors = {
  primary: { background: '#007bff', color: '#fff', hover: '#0069d9' },
  secondary: { background: '#6c757d', color: '#fff', hover: '#5a6268' },
  success: { background: '#28a745', color: '#fff', hover: '#218838' },
  danger: { background: '#dc3545', color: '#fff', hover: '#c82333' },
  light: { background: '#f8f9fa', color: '#212529', hover: '#e2e6ea' },
  dark: { background: '#343a40', color: '#fff', hover: '#23272b' },
}

export default Button;