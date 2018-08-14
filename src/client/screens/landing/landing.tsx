import * as React from 'react';
import { Link } from 'react-router-dom';
const styles = require('./landing.scss');

export default () => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>Welcome to super advanced <span>chat application</span></h1>
        <h2 className={styles.header__subtitle}>Awesome communicator with <span>socket.io</span> under the hood</h2>
        <div className={styles.header__buttons}>
          <Link to="/signin">Sign in</Link>
          <span>or</span>
          <Link to="/signup">Create new account</Link>
        </div>
      </div>
      <img className={styles.picture} src="https://camo.githubusercontent.com/6d2b2ed9605244a04cb7c4f6defc9d7e164bb785/68747470733a2f2f692e696d6775722e636f6d2f543942387167572e706e67" alt="Image"/>
    </div>
  </div>
)