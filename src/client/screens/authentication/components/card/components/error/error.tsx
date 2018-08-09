import * as React from 'react';

const styles = require('./error.scss');

interface IProps {
  message: string
}

const Error = (props: IProps) => {
  return (
    <p className={styles.error}>
      {props.message}
    </p>
  )
}

export default Error;