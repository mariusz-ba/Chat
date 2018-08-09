import * as React from 'react';
import axios from 'axios';

import Button from '../../../components/button/button';
import Card from '../components/card/card';
import Form from '../components/form/form';

const styles = require('../authentication.scss');

interface IError {
  username: string,
  email: string,
  confirm: string
}

interface IState {
  username: string,
  email: string,
  password: string,
  confirm: string,
  errors: IError
}

export default class Signup extends React.Component<{}, IState> {
  state = {
    username: '',
    password: '',
    email: '',
    confirm: '',
    errors: {
      username: '',
      email: '',
      confirm: ''
    }
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name as keyof IState;
    const value = e.currentTarget.value as string;
    const data: any = {};
    data[name] = value;
    this.setState(data);
  }

  handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await this.validate();
    const { errors } = this.state;
    if(errors.username === '' && errors.email === '' && errors.confirm === '') {
      try {
        const { username, email, password } = this.state;
        const res = await axios.post('/api/users', { username, email, password });
        const user = res.data;
      } catch (e) {
        this.setState({ errors: { ...this.state.errors, ...e.response.data } });
      }
    }
  }

  validate = async () => {
    await this.clearErrors();
    if(this.state.password !== this.state.confirm)
      await this.setState({ errors: { ...this.state.errors, confirm: 'Password does not match' }})
  }

  clearErrors = async () => {
    await this.setState({ errors: { username: '', email: '', confirm: '' }});
  }

  render() {
    const { username, email, password, confirm, errors } = this.state;

    return (
      <div className={styles.container}>
        <Card>
          <Card.Title text="Sign up"/>
          <Form>
            <Form.Group error={errors.username.length > 0}>
              <label htmlFor="username">Username</label>
              <input id="username" type="text" name="username" value={username} onChange={this.handleChange}/>
              { errors.username &&
                <small>{errors.username}</small>
              }
            </Form.Group>
            <Form.Group error={errors.email.length > 0}>
              <label htmlFor="email">E-Mail</label>
              <input id="email" type="email" name="email" value={email} onChange={this.handleChange}/>
              { errors.email &&
                <small>{errors.email}</small>
              }
            </Form.Group>
            <Form.Group>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" value={password} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group error={errors.confirm.length > 0}>
              <label htmlFor="confirm">Confirm password</label>
              <input id="confirm" type="password" name="confirm" value={confirm} onChange={this.handleChange}/>
              { errors.confirm &&
                <small>{errors.confirm}</small>
              }
            </Form.Group>
            <Button primary onClick={this.handleSubmit}>Sign up</Button>
          </Form>
        </Card>
      </div>
    )
  }
}