import * as React from 'react';
import classnames from 'classnames';

const styles = require('./group.scss');

interface IGroup {
  error?: boolean
  children: any
}

export default function Group(props: IGroup) {
  const classNames = classnames(styles.group, {
    [styles.group_error]: props.error
  })

  return (
    <div className={classNames}>
      {props.children}
    </div>
  )
}