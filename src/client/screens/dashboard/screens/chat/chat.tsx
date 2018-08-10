import * as React from 'react';
import { connect } from 'react-redux';
import { IState as IUsersState } from 'services/users/users.constants';
import { IState as IAuthState } from 'services/auth/auth.constants';
import { IState as IMessagesState, IMessage } from 'services/messages/messages.constants';
import { fetchUsers, fetchUser } from 'services/users/users.actions';
import { sendMessage } from 'services/messages/messages.actions';
import values = require('lodash/values');
import omit = require('lodash/omit');

import Socket from 'services/sockets/socket';

import Conversations from './components/conversations/conversations';
import Conversation from './components/conversation/conversation';

const styles = require('./chat.scss');

interface IProps {
  auth: IAuthState,
  users: IUsersState,
  messages: IMessagesState,
  fetchUser(userId: string): any,
  fetchUsers(filter: any): any,
  sendMessage(message: IMessage): any
}

interface IState {
  current?: string
}

export class Chat extends React.Component<IProps, IState> {
  state = {
    current: ''
  }

  async componentDidMount () {
    await this.props.fetchUsers({});
    await this.props.fetchUser(this.props.auth.user._id);
  }

  conversationClicked = (userId: string) => {
    console.log('Opening chat with user: ', userId);

    // Set current conversation
    this.setState({ current: userId });
  }

  sendMessage = (message: string) => {
    // send to state.current
    const socket = Socket.getInstance();
    const data: any = {
      from: this.props.auth.user._id,
      to: this.state.current,
      content: message
    }
    socket.send(data);
    this.props.sendMessage(data);
  }

  render() {
    const messages = 
      this.state.current &&
      this.props.messages.messages &&
      this.props.messages.messages[this.state.current] ? 
      this.props.messages.messages[this.state.current] : [];

    return (
      <div className={styles.container}>
        <div className={styles.conversations}>
          <Conversations 
            users={values(omit(this.props.users.users, this.props.auth.user._id))} 
            onConversationClicked={this.conversationClicked}/>
        </div>
        <div className={styles.conversation}>
          <Conversation
            messages={messages.map(message => ({
              from: this.props.users.users[message.from],
              to: this.props.users.users[message.to],
              content: message.content,
            }))}
            send={this.sendMessage}
            user={this.props.auth.user._id}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = 
  ({ auth, users, messages }: { auth: any, users: any, messages: any}) => 
  ({ auth, users, messages });

export default connect(mapStateToProps, { fetchUser, fetchUsers, sendMessage })(Chat);