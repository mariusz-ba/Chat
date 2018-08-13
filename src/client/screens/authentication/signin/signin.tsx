import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ICredentials, signIn } from '../../../services/auth/auth.actions';
import { IState as IAuthState } from '../../../services/auth/auth.constants';

import Button from '../../../components/button/button';
import Card from '../components/card/card';
import Form from '../components/form/form';

const styles = require('../authentication.scss');

interface IProps {
  history: any,
  auth: IAuthState,
  signIn(credentials: ICredentials): any
}

interface IState {
  identifier: string,
  password: string
}

export class Signin extends React.Component<IProps, IState> {
  state = {
    identifier: '',
    password: ''
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
    const { identifier, password } = this.state;
    await this.props.signIn({ identifier, password });
    if(this.props.auth.errors === null)
      this.props.history.push('/');
  }

  render() {
    const { identifier, password } = this.state;
    const { errors } = this.props.auth;

    return (
      <div className={styles.container}>
        <Card>
          <Card.Title text="Sign in"/>
          { errors &&
            <Card.Error message={errors.form}/>
          }
          <Form>
            <Form.Group error={errors && errors.form}>
              <label htmlFor="identifier">Username or E-Mail</label>
              <input id="identifier" type="text" name="identifier" value={identifier} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group error={errors && errors.form}>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" value={password} onChange={this.handleChange}/>
            </Form.Group>
            <Button primary onClick={this.handleSubmit}>Sign in</Button>
          </Form>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }: { auth: any }) => ({ auth });

export default withRouter<any>(connect(mapStateToProps, { signIn })(Signin));