import * as React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from 'services/users/users.constants';
import classnames from 'classnames';
const styles = require('./conversation.scss');

interface IProps {
  active?: boolean,
  user: IUser,
  lastMessage: any
  onClicked(userId: string): any
}

export default class UserItem extends React.Component<IProps> {
  onClicked = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.props.onClicked(this.props.user._id);
  }

  render() {
    const { user } = this.props;

    const classNames = classnames(styles.item, {
      [styles.item_active]: this.props.active
    })

    const avatarStyles = classnames(styles.avatar, {
      [styles.avatar_online]: user.online
    })

    const firstname = user.firstname.length > 0 ? user.firstname : '';
    const lastname = user.lastname.length > 0 ? user.lastname : '';
    const fullname = firstname.length > 0 || lastname.length > 0 ? firstname + ' ' + lastname : user.username;

    return (
      <li className={classNames}>
        <Link className={styles.link} to="#" onClick={this.onClicked}>
          <div className={avatarStyles}>
            <img src={user.avatar} alt="Avatar"/>
          </div>
          <div className={styles.content}>
            <h2 className={styles.content__username}>{fullname}</h2>
            <p className={styles.content__preview}>{ this.props.lastMessage && this.props.lastMessage.content }</p>
            <p className={styles.content__typing}>
              &middot;&middot;&middot;
            </p>
          </div>
        </Link>
      </li>
    )
  }
}