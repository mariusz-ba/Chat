import * as React from 'react';
import classnames from 'classnames';
const styles = require('./button.scss');

interface IButton {
  primary?: boolean,
  secondary?: boolean,
  success?: boolean,
  danger?: boolean,
  dark?: boolean,
  className?: string
  children: any,
  onClick(e: React.SyntheticEvent<HTMLButtonElement>): void
}

export default function Button(props: IButton) {

  const classNames = classnames(styles.button, {
    [styles.button_primary]: props.primary,
    [styles.button_secondary]: props.secondary,
    [styles.button_success]: props.success,
    [styles.button_danger]: props.danger,
    [styles.button_dark]: props.dark,
  })

  return (
    <button className={classNames} onClick={props.onClick}>
      {props.children}
    </button>
  )
}