import * as React from 'react';

import Title from './components/title/title';
import Error from './components/error/error';

const styles = require('./card.scss');

interface IProps {
  children: any
}

export default class Card extends React.Component<IProps> {
  static Title = Title;
  static Error = Error;

  render() {
    return (
      <div className={styles.card}>
        {this.props.children}
      </div>
    )
  }
}