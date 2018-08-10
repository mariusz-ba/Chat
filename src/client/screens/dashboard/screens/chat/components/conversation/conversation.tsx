import * as React from 'react';
import { IUser } from 'services/users/users.constants';

interface IMessage {
  from: IUser,
  to: IUser,
  content: string
}

interface IProps {
  messages: Array<IMessage>,
  send(message: string): any
}

interface IState {
  message: string
}

export default class Conversation extends React.Component<IProps, IState> {
  state = {
    message: ''
  }

  changeMessage = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ message: e.currentTarget.value });
  }
  
  send = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.send(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    const messages = this.props.messages.map((message: IMessage, index) => (
      <li key={index}>
        From: {message.from.username},
        To: {message.to.username}
        Content: {message.content}
      </li>
    ))

    return (
      <div>
        <div>
          <ul>{messages}</ul>
        </div>
        <div>
          <form>
            <input type="text" value={this.state.message} onChange={this.changeMessage}/>
            <button type="submit" onClick={this.send}>Send</button>
          </form>
        </div>
      </div>
    )
  }
}