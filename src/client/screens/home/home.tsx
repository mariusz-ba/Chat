import * as React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../dashboard/dashboard';
import Landing from '../landing/landing';

interface IProps {
  isAuthenticated: boolean
}

const Home = (props: IProps) => {
  if(props.isAuthenticated)
    return <Dashboard/>
  return <Landing/>
}

const mapStateToProps = 
  ({ auth }: { auth: any }) =>
  ({ isAuthenticated: auth.isAuthenticated })

export default connect(mapStateToProps)(Home);