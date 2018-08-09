import * as React from 'react';

const styles = require('./title.scss');

interface IProps {
  text: string
}

const Title = (props: IProps) => {
  return (
    <h1 className={styles.title}>
      {props.text}
    </h1>
  )
}

export default Title;