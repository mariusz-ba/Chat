import * as React from 'react';
import { connect } from 'react-redux';
import { signOut } from 'services/auth/auth.actions';
import { Link } from 'react-router-dom';

const styles = require('./navbar.scss');

interface IProps {
  signOut(): any
}

export function Navbar(props: IProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <img className={styles.avatar} src="https://i1.wp.com/grueneroadpharmacy.com/wp-content/uploads/2017/02/user-placeholder-1.jpg?ssl=1" alt="Avatar"/>
        <h1 className={styles.title}>Mariusz Baran</h1>
        <h2 className={styles.subtitle}>@mariusz</h2>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link className={styles.menu__item} to="/">
            <span className={`${styles.icon} fas fa-comments`}></span><span className={styles.text}>Chat</span>
          </Link>
        </li>
        <li>
          <Link className={styles.menu__item} to="/profile">
            <span className={`${styles.icon} fas fa-user`}></span><span className={styles.text}>Profile</span>
          </Link>
        </li>
        <li>
          <Link className={styles.menu__item} to="/settings">
            <span className={`${styles.icon} fas fa-cogs`}></span><span className={styles.text}>Settings</span>
          </Link>
        </li>
      </ul>
      <div className={styles.footer}>
        <div className={styles.signout} onClick={props.signOut}>
          <span className={`${styles.signout_icon} fas fa-sign-out-alt`}></span>
          <span className={styles.signout_text}>Sign out</span>
        </div>
      </div>
    </nav>
  )
}

export default connect(null, { signOut })(Navbar);