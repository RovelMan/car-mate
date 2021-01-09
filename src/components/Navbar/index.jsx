import * as React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

const { Header } = Layout;

class NavbarBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKey: ROUTES.LANDING,
    };
  }

  onSelect = (e) => {
    this.setState({ selectedKey: e.key });
  }

  componentDidMount() {
    const { selectedKey } = this.state;
    const pathname = this.props.history.location.pathname;
    if (pathname !== selectedKey) {
      this.setState({ selectedKey: pathname });
    }
  }

  render () {
    const { selectedKey } = this.state;
    return (
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} onSelect={this.onSelect}>
          <Menu.Item key={ROUTES.LANDING}><Link to={ROUTES.LANDING}>Landing</Link></Menu.Item>
          <Menu.Item key={ROUTES.LOGIN}><Link to={ROUTES.LOGIN}>Login</Link></Menu.Item>
          <Menu.Item key={ROUTES.SIGN_UP}><Link to={ROUTES.SIGN_UP}>Sign Up</Link></Menu.Item>
          <Menu.Item key={ROUTES.HOME}><Link to={ROUTES.HOME}>Home</Link></Menu.Item>
          <Menu.Item key={ROUTES.ACCOUNT}><Link to={ROUTES.ACCOUNT}>Account</Link></Menu.Item>
          <Menu.Item key={ROUTES.ADMIN}><Link to={ROUTES.ADMIN}>Admin</Link></Menu.Item>
        </Menu>
      </Header>
    )
  }
}

const Navbar = compose(withRouter) (NavbarBase);

export default Navbar;
