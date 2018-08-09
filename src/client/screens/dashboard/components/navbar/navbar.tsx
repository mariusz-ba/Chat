import * as React from 'react';
import { Link } from 'react-router-dom';

const styles = require('./navbar.scss');

export default function Navbar() {
  return (
    <nav>
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
    </nav>
  )
}