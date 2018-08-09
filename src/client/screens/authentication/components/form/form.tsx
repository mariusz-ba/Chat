import * as React from 'react';
import Group from './components/group/group';

const styles = require('./form.scss');

interface IProps {
  children: any
}

export default class Form extends React.Component<IProps> {
  static Group = Group;
  
  render() {
    return (
      <form className={styles.form}>
        {this.props.children}
      </form>
    )
  }
}