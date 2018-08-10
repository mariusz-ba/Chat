import * as React from 'react';
import { connect } from 'react-redux';
import { IState as IUsersState } from 'services/users/users.constants';
import { IState as IAuthState } from 'services/auth/auth.constants';
import { fetchUsers } from 'services/users/users.actions';
import values = require('lodash/values');

import Socket from 'services/sockets/socket';

import Conversations from './components/conversations/conversations';
const styles = require('./chat.scss');

interface IProps {
  auth: IAuthState,
  users: IUsersState,
  fetchUsers(filter: any): any
}

export class Chat extends React.Component<IProps> {
  componentDidMount () {
    this.props.fetchUsers({});
  }
  
  openChat(userId: string) {
    const socket = Socket.getInstance();
    socket.send({ 
      from: this.props.auth.user._id,
      to: userId,
      content: 'This is message that is sent only to u :*'
    })
  }

  conversationClicked = (userId: string) => {
    console.log('Opening chat with user: ', userId);
    // Set current conversation
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.conversations}>
          <Conversations users={values(this.props.users.users)} onConversationClicked={this.conversationClicked}/>
        </div>
        <div className={styles.conversation}>
          In progress..
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, users }: { auth: any, users: any}) => ({ auth, users });

export default connect(mapStateToProps, { fetchUsers })(Chat);