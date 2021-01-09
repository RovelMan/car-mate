import * as React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import * as ROUTES from '../../constants/routes';

const { Header } = Layout;

export default class Navbar extends React.Component {
  render () {
    return (
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to={ROUTES.LANDING}>Landing</Link></Menu.Item>
          <Menu.Item key="2"><Link to={ROUTES.LOGIN}>Login</Link></Menu.Item>
          <Menu.Item key="3"><Link to={ROUTES.SIGN_UP}>Sign Up</Link></Menu.Item>
          <Menu.Item key="4"><Link to={ROUTES.HOME}>Home</Link></Menu.Item>
          <Menu.Item key="5"><Link to={ROUTES.ACCOUNT}>Account</Link></Menu.Item>
          <Menu.Item key="6"><Link to={ROUTES.ADMIN}>Admin</Link></Menu.Item>
        </Menu>
      </Header>
    )
  }
}
