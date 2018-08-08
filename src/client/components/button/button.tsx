import * as React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  outline: 0;
  border: 0;
  border-radius: 3px;
  padding: .5rem 1rem;
  transition: background linear .125s;

  color: ${
    (props: any) => props.mode ?
      colors[props.mode].color :
      colors['light'].color
  };

  background: ${ 
    (props: any)  => props.mode ? 
      colors[props.mode].background : 
      colors['light'].background 
  };

    &:hover {
    cursor: pointer;
    background: ${ 
      (props: any) => props.mode ? 
        colors[props.mode].hover : 
        colors['light'].hover
    };
  }
`

interface IProps {
  mode?: string,
  children?: any,
  onClick(e: React.SyntheticEvent<HTMLButtonElement>): any
}

export default class Button extends React.Component<IProps> {
  render() {
    return (
      <StyledButton {...this.props}>
        {this.props.children}
      </StyledButton>
    )
  }
}


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