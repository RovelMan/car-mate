import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';

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
    return (
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} onSelect={this.onSelect}>
          <Menu.Item key={ROUTES.LANDING}><Link to={ROUTES.LANDING}>Landing</Link></Menu.Item>
          <Menu.Item key={ROUTES.SIGN_IN}><Link to={ROUTES.SIGN_IN}>Sign In</Link></Menu.Item>
          <Menu.Item key={ROUTES.SIGN_UP}><Link to={ROUTES.SIGN_UP}>Sign Up</Link></Menu.Item>
          <Menu.Item key={ROUTES.HOME}><Link to={ROUTES.HOME}>Home</Link></Menu.Item>
          <Menu.Item key={ROUTES.ACCOUNT}><Link to={ROUTES.ACCOUNT}>Account</Link></Menu.Item>
          <Menu.Item key={ROUTES.ADMIN}><Link to={ROUTES.ADMIN}>Admin</Link></Menu.Item>
          <Menu.Item key="sign_out"><SignOutButton /></Menu.Item>
        </Menu>
      </Header>
    );
  }
}

const Navbar = compose(withRouter)(NavbarBase);

NavbarBase.defaultProps = {
  history: '',
};

NavbarBase.propTypes = {
  history: History,
};

export default Navbar;
