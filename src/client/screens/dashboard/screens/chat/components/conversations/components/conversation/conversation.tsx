import * as React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from 'services/users/users.constants';
import classnames from 'classnames';
const styles = require('./conversation.scss');

interface IProps {
  active?: boolean,
  user: IUser,
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

    return (
      <li className={classNames}>
        <Link className={styles.link} to="#" onClick={this.onClicked}>
          <div className={avatarStyles}>
            <img src="https://i1.wp.com/grueneroadpharmacy.com/wp-content/uploads/2017/02/user-placeholder-1.jpg?ssl=1" alt="Avatar"/>
          </div>
          <div className={styles.content}>
            <h2 className={styles.content__username}>{user.username}</h2>
            <p className={styles.content__preview}>Last message received from this user</p>
            <p className={styles.content__typing}>
              &middot;&middot;&middot;
            </p>
          </div>
        </Link>
      </li>
    )
  }
}