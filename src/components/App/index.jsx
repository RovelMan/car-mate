import './App.css';
import * as React from 'react';
import { Layout } from 'antd';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { withFirebase } from '../Firebase';

import AccountPage from '../Account';
import AdminPage from '../Admin';
import HomePage from '../Home';
import LandingPage from '../Landing';
import Navbar from '../Navbar';
import PageNotFound from '../PageNotFound';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';

import * as ROUTES from '../../constants/routes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.listener = firebase.auth.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authUser } = this.state;
    return (
      <Router>
        <Layout>
          <Navbar authUser={authUser} />
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

export default withFirebase(App);
