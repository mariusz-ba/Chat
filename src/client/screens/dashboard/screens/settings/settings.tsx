import * as React from 'react';
import { connect } from 'react-redux';
import { IState as IAuthState } from 'services/auth/auth.constants';
import { IState as IUsersState } from 'services/users/users.constants';
import { fetchUser, updateUser, setUsersErrors } from 'services/users/users.actions';
import Button from 'components/button/button';
import axios from 'axios';
const styles = require('./settings.scss');

interface IState {
  basic: {
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    avatar: string
  }
  password: {
    previous: string,
    password: string,
    confirm: string
  },
  error: {
    basic: string,
    password: string
  }
}

interface IProps {
  auth: IAuthState,
  users: IUsersState,
  fetchUser(id: string): any,
  updateUser(id: string, data: any): any,
  setUsersErrors(errors: any): any
}

export class Settings extends React.Component<IProps, IState> {
  state  = {
    basic: {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      avatar: ''
    },
    password: {
      previous: '',
      password: '',
      confirm: ''
    },
    error: {
      basic: '',
      password: ''
    }
  }

  async componentDidMount() {
    // Take the user information from the store and pass it to component state
    const userId = this.props.auth.user._id;
    
    await this.props.fetchUser(userId);

    const user = this.props.users.users[userId];
    
    if(!user)
      return; // Set some errors

    this.setState({
      basic: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        avatar: user.avatar
      }
    })
  }

  changeBasic = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name as keyof IState['basic'];
    const value = e.currentTarget.value;
    const data: any = {};
    data[name] = value;
    this.setState({ basic: { ...this.state.basic, ...data }});
  }

  changePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name as keyof IState['password'];
    const value = e.currentTarget.value;
    const data: any = {};
    data[name] = value;
    this.setState({ password: { ...this.state.password, ...data }});
  }

  submitBasic = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Dispatch an action cause we'll also have to use sockets to notify
    // other users that my data has been chagned so they can update their state
    await this.props.updateUser(this.props.auth.user._id, this.state.basic);


    if(this.props.users.errors)
      this.setState({ error: { ...this.state.error, basic: 'Selected username or email is currently not available' }});
    else
      this.setState({ error: { ...this.state.error, basic: '' }});

    // Clear errors in reducer
    this.props.setUsersErrors(null);
  
    const userData: any = {
      username: this.props.users.users[this.props.auth.user._id].username,
      email: this.props.users.users[this.props.auth.user._id].email,
      fristname: this.props.users.users[this.props.auth.user._id].firstname,
      lastname: this.props.users.users[this.props.auth.user._id].lastname,
      avatar: this.props.users.users[this.props.auth.user._id].avatar,
    }

    // Update form state
    this.setState({
      basic: userData
    })
  }

  submitPassword = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(this.state.password.password !== this.state.password.confirm) {
      this.setState({ error: { ...this.state.error, password: 'Password does not match' }});
      return;
    }

    const res = await axios.put(`/api/users/${this.props.auth.user._id}`, this.state.password);
    const data = res.data;

    if(data.ok === 1) {
      // Password has been changed
      this.setState({ 
        password: {
          previous: '',
          password: '',
          confirm: ''
        },
        error: {
          ...this.state.error,
          password: ''
        }
      })
    } else {
      // Password has not been changed
      this.setState({ error: { ...this.state.error, password: 'Wrong password' }});
    }
  }

  render() {
    const { basic, password } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>Settings</h1>
            <div className={styles.settings}>
              <h2 className={styles.section_heading}>Basic information</h2>
              { this.state.error.basic.length > 0 &&
                <p className={styles.error}>{this.state.error.basic}</p>
              }
              <form className={styles.form}>
                <div className={styles.form__group}>
                  <label htmlFor="username">Username</label>
                  <input id="username" name="username" placeholder="Pick your nickname" type="text" value={basic.username} onChange={this.changeBasic}/>
                </div>
                <div className={styles.form__group}>
                  <label htmlFor="firstname">Firstname</label>
                  <input id="firstname" name="firstname" placeholder="Your firstname" type="text" value={basic.firstname} onChange={this.changeBasic}/>
                </div>
                <div className={styles.form__group}>
                  <label htmlFor="lastname">Lastname</label>
                  <input id="lastname" name="lastname" placeholder="Your lastname" type="text" value={basic.lastname} onChange={this.changeBasic}/>
                </div>
                <div className={styles.form__group}>
                  <label htmlFor="email">E-Mail</label>
                  <input id="email" name="email" placeholder="E-Mail" type="email" value={basic.email} onChange={this.changeBasic}/>
                </div>
                <div className={styles.form__group}>
                  <label htmlFor="avatar">Avatar</label>
                  <input id="avatar" name="avatar" placeholder="Avatar url" type="text" value={basic.avatar} onChange={this.changeBasic}/>
                </div>
                <Button primary onClick={this.submitBasic}>Submit</Button>
              </form>
              <h2 className={styles.section_heading}>Change password</h2>
              { this.state.error.password.length > 0 &&
                <p className={styles.error}>{this.state.error.password}</p>
              }
              <form className={styles.form}>
                <div className={styles.form__group}>
                  <label htmlFor="previous">Current password</label>
                  <input id="previous" name="previous" placeholder="Your current password" type="password" value={password.previous} onChange={this.changePassword}/>
                </div>
                <div className={styles.form__group}>
                  <label htmlFor="password">New password</label>
                  <input id="password" name="password" placeholder="New password" type="password" value={password.password} onChange={this.changePassword}/>
                </div>
                <div className={styles.form__group}>
                  <label htmlFor="confirm">Confirm</label>
                  <input id="confirm" name="confirm" placeholder="Confirm new password" type="password" value={password.confirm} onChange={this.changePassword}/>
                </div>
                <Button primary onClick={this.submitPassword}>Submit</Button>
              </form>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, users }: { auth: any, users: any }) => ({ auth, users });

export default connect(mapStateToProps, { fetchUser, updateUser, setUsersErrors })(Settings);