import './App.css';
import * as React from 'react';
import { Layout } from 'antd';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { withAuthentication } from '../Session';

import AccountPage from '../Account';
import AdminPage from '../Admin';
import HomePage from '../Home';
import LandingPage from '../Landing';
import Navbar from '../Navbar';
import PageNotFound from '../PageNotFound';
import PasswordForgetPage from '../PasswordForget';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';

import * as ROUTES from '../../constants/routes';

function App() {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Layout>
          <Switch>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route component={PageNotFound} />
          </Switch>
        </Layout>
      </Layout>
    </Router>
  );
}

export default withAuthentication(App);
