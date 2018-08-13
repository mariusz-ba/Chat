import * as React from 'react';
import { IUser } from 'services/users/users.constants';
import Conversation from './components/conversation/conversation';

const styles = require('./conversations.scss');

interface IProps {
  users: Array<IUser>,
  lastMessages: any,
  onConversationClicked(userId: string): any
}

interface IState {
  current?: string
}

export default class Conversations extends React.Component<IProps, IState> {
  state = {
    current: ''
  }

  onConversationClicked = (userId: string) => {
    this.setState({ current: userId });
    this.props.onConversationClicked(userId);
  }

  render() {
    return (
      <ul className={styles.conversations_list}>
        {
          this.props.users.map((user: IUser) => {
            const lastMessage = 
              this.props.lastMessages[user._id] &&
              this.props.lastMessages[user._id].message;

            const isTyping = 
              this.props.lastMessages[user._id] &&
              this.props.lastMessages[user._id].isTyping;

            return (
              <Conversation 
                active={this.state.current === user._id} 
                lastMessage={lastMessage}
                isTyping={isTyping}
                key={user._id} 
                user={user} 
                onClicked={this.onConversationClicked}/>
            )
          })
        }
      </ul>
    )
  }
}