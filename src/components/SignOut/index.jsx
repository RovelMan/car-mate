import * as React from 'react';
import { withFirebase } from '../Firebase';
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

class SignOutButton extends React.Component {
  render() {
    return (
      <Link
        to={ROUTES.SIGN_IN}
        onClick={this.props.firebase.doSignOut}
      >
        Sign Out
      </Link>
    )
  }
}

export default withRouter(withFirebase(SignOutButton));
