import * as React from 'react';
import { connect } from 'react-redux';
import { IState as IUsersState } from 'services/users/users.constants';
import { IState as IAuthState } from 'services/auth/auth.constants';
import { IState as IMessagesState, IMessage } from 'services/messages/messages.constants';
import { fetchUsers, fetchUser } from 'services/users/users.actions';
import { fetchMessages } from 'services/messages/messages.actions';
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
  fetchMessages(userId: string): any,
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
    await this.props.fetchMessages(this.props.auth.user._id);
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

  userStartedTyping = () => {
    const socket = Socket.getInstance();
    socket.startTyping(this.props.auth.user._id, this.state.current);
  }

  userStoppedTyping = () => {
    const socket = Socket.getInstance();
    socket.stopTyping(this.props.auth.user._id, this.state.current);
  }

  render() {
    const messages = 
      this.state.current &&
      this.props.messages.messages &&
      this.props.messages.messages[this.state.current] && 
      this.props.messages.messages[this.state.current].items ?
      this.props.messages.messages[this.state.current].items : [];
      

    const lastMessages: any = {};
    for(let key in this.props.messages.messages) {
      const isTyping =
        this.props.messages.messages[key] &&
        this.props.messages.messages[key].isTyping;
      const array = 
        this.props.messages.messages[key] &&
        this.props.messages.messages[key].items ?
        this.props.messages.messages[key].items : [];
      //lastMessages[key] = array[array.length - 1] ? array[array.length - 1] : null;'
      lastMessages[key] = {
        isTyping,
        message: array[array.length - 1] ? array[array.length - 1] : null
      }
    }

    const rightWidget = 
      this.state.current.length > 0 ?
      (
        <div className={styles.conversation}>
          <Conversation
            messages={messages.map(message => ({
              from: this.props.users.users[message.from],
              to: this.props.users.users[message.to],
              content: message.content
            }))}
            send={this.sendMessage}
            user={this.props.auth.user._id}
            onStartTyping={this.userStartedTyping}
            onStopTyping={this.userStoppedTyping}
          />
        </div>
      ) :
      (
        <div className={styles.placeholder}>
          <div className={styles.placeholder__container}>
            <i className={`${styles.placeholder__icon} fas fa-angle-left`}></i>
            <h1 className={styles.placeholder__heading}>Select conversation</h1>
            <p className={styles.placeholder__description}>No conversation has been choosen. <br/>Please select conversation from the box on your left.</p>
          </div>
        </div>
      )

    return (
      <div className={styles.container}>
        <div className={styles.conversations}>
          <Conversations 
            users={values(omit(this.props.users.users, this.props.auth.user._id))} 
            lastMessages={lastMessages}
            onConversationClicked={this.conversationClicked}/>
        </div>
        { rightWidget }
      </div>
    )
  }
}

const mapStateToProps = 
  ({ auth, users, messages }: { auth: any, users: any, messages: any}) => 
  ({ auth, users, messages });

export default connect(mapStateToProps, { fetchUser, fetchUsers, fetchMessages, sendMessage })(Chat);