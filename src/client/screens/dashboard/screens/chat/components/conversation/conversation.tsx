import * as React from 'react';
import { IUser } from 'services/users/users.constants';
import classnames from 'classnames';

const styles = require('./conversation.scss');

interface IMessage {
  from: IUser,
  to: IUser,
  content: string
}

interface IProps {
  user: string,
  messages: Array<IMessage>,
  send(message: string): any,
  onStartTyping(): any,
  onStopTyping(): any
}

interface IState {
  message: string,
  delay: number,
  isTyping: boolean
}

export default class Conversation extends React.Component<IProps, IState> {
  private interval: any;

  state = {
    message: '',
    delay: 0,
    isTyping: false
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if(this.state.delay > 0)
        this.setState({ delay: this.state.delay - 1 });
    }, 1000);
  }

  componentWillUnmount() {
    if(this.interval)
      clearInterval(this.interval);
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if(prevState.delay !== this.state.delay)
      if(this.state.delay === 0) {
        this.setState({ isTyping: false });
        this.props.onStopTyping();
      }
  }

  changeMessage = (e: React.FormEvent<HTMLInputElement>) => {
    if(!this.state.isTyping) {
      this.props.onStartTyping();
    }
    this.setState({ delay: 2, isTyping: true, message: e.currentTarget.value });
  }
  
  send = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('sending message');
    this.props.send(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    const messages = this.props.messages.map((message: IMessage, index) => {
      const itemStyles = classnames(styles.messages__item, {[styles.messages__item_right]: this.props.user === message.from._id });
      return (
        <li className={itemStyles} key={index}>
          <div className={styles.messages__avatar}>
            <img src={message.from.avatar} alt="Avatar"/>
          </div>
          <div className={styles.messages__message}>{message.content}</div>
        </li>
      )
    })

    return (
      <div className={styles.container}>
        <div className={styles.messages}>
          <ul className={styles.messages__list}>{messages}</ul>
        </div>
        <div>
          <form className={styles.editor}>
            <input className={styles.editor__input} placeholder="What do You want to say" value={this.state.message} onChange={this.changeMessage}/>
            <button className={styles.editor__button} type="submit" onClick={this.send}><i className="fas fa-arrow-right"></i></button>
          </form>
        </div>
      </div>
    )
  }
}