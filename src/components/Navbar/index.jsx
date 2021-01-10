import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AuthUserContext from '../Session';
import SignOutButton from '../SignOut';

import * as ROUTES from '../../constants/routes';

const { Header } = Layout;

class NavbarBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: ROUTES.LANDING,
    };
  }

  componentDidMount() {
    const { selectedKey } = this.state;
    const { history } = this.props;
    const { pathname } = history.location;
    if (pathname !== selectedKey) {
      this.setState({ selectedKey: pathname });
    }
  }

  onSelect = (e) => {
    this.setState({ selectedKey: e.key });
  }

  render() {
    const { selectedKey } = this.state;
    const authLinks = [
      { uri: ROUTES.LANDING, text: 'Landing' },
      { uri: ROUTES.HOME, text: 'Home' },
      { uri: ROUTES.ACCOUNT, text: 'Account' },
      { uri: ROUTES.ADMIN, text: 'Admin' },
    ];
    const unauthlinks = [
      { uri: ROUTES.LANDING, text: 'Landing' },
      { uri: ROUTES.SIGN_IN, text: 'Sign In' },
      { uri: ROUTES.SIGN_UP, text: 'Sign Up' },
    ];

    return (
      <Header>
        <AuthUserContext.Consumer>
          {(authUser) => {
            const links = authUser ? authLinks : unauthlinks;
            return (
              <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} onSelect={this.onSelect}>
                {links.map((link) => (
                  <Menu.Item key={link.uri}>
                    <Link to={link.uri}>{link.text}</Link>
                  </Menu.Item>
                ))}
                {authUser && <Menu.Item key="sign_out"><SignOutButton /></Menu.Item>}
              </Menu>
            );
          }}
        </AuthUserContext.Consumer>
      </Header>
    );
  }
}

const Navbar = compose(withRouter)(NavbarBase);

export default Navbar;
