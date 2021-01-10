import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Navbar from "../Navbar";
import { Layout } from 'antd';
import LandingPage from '../Landing';
import HomePage from '../Home';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import PageNotFound from '../PageNotFound';
import * as ROUTES from '../../constants/routes';

export default class App extends React.Component {
  constructor(props) {
    super (props);

    this.state = {
      authUser: null,
    };
  }

  render() {
    return (
      <Router>
        <Layout>
          <Navbar authUser={this.state.authUser} />
          <Layout>
            <Switch>
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route path={ROUTES.ADMIN} component={AdminPage} />
              <Route component={PageNotFound} />
            </Switch>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
