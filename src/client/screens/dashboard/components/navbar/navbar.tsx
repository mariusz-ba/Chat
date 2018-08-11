import * as React from 'react';
import { connect } from 'react-redux';
import { signOut } from 'services/auth/auth.actions';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import classnames from 'classnames';

const styles = require('./navbar.scss');

interface IProps {
  location: any,
  signOut(): any
}

const routes = [
  { to: '/', icon: 'fas fa-comments', text: 'Chat' },
  { to: '/profile', icon: 'fas fa-user', text: 'Profile' },
  { to: '/settings', icon: 'fas fa-cogs', text: 'Settings' }
]

export function Navbar(props: IProps) {
  
  // Determine by the route whitch menu is active and add
  // active class to this item
  console.log(props);

  const menuItems = routes.map((route, index) => {
    const classNames = classnames(styles.menu__item, {
      [styles.menu__item_active]: route.to === props.location.pathname
    })
    return (
      <li key={index}>
        <Link className={classNames} to={route.to}>
          <span className={`${styles.icon} ${route.icon}`}></span><span className={styles.text}>{route.text}</span>
        </Link>
      </li>
    )
  })

  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <img className={styles.avatar} src="https://i1.wp.com/grueneroadpharmacy.com/wp-content/uploads/2017/02/user-placeholder-1.jpg?ssl=1" alt="Avatar"/>
        <h1 className={styles.title}>Mariusz Baran</h1>
        <h2 className={styles.subtitle}>@mariusz</h2>
      </div>
      <ul className={styles.menu}>
        { menuItems }
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

export default withRouter<any>(connect(null, { signOut })(Navbar));