import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import Firebase, { withFirebase } from '../Firebase';

function SignOutButton(props) {
  const { firebase } = props;
  return (
    <Link
      to={ROUTES.SIGN_IN}
      onClick={firebase.doSignOut}
    >
      Sign Out
    </Link>
  );
}

SignOutButton.defaultProps = {
  firebase: '',
};

SignOutButton.propTypes = {
  firebase: Firebase || '',
};

export default withRouter(withFirebase(SignOutButton));
