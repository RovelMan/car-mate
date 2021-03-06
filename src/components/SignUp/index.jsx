import * as React from 'react';
import {
  Alert, Button, Form, Input, Layout, Typography,
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const { Content } = Layout;
const { Title } = Typography;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

export default function SignUp() {
  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          marginTop: 24,
          minHeight: 280,
        }}
      >
        <Title level={3}>Sign Up</Title>
        <SignUpForm />
      </Content>
    </Layout>
  );
}

class SignUpFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onFinish = () => {
    const { username, email, password } = this.state;
    const { firebase, history } = this.props;
    // Create user in Firebase realtime database
    firebase
      .doCreateUser(email, password)
      .then((authUser) => firebase
        .user(authUser.user.uid)
        .set({ username, email }))
      .then(() => {
        this.setState({
          username,
          email,
          password,
        });
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      error,
    } = this.state;
    const isInvalid = password !== confirmPassword
      || password === ''
      || email === ''
      || username === '';
    return (
      <Form {...layout} onFinish={this.onFinish}>
        <Form.Item
          label="Username"
          name="username"
          value={username}
          onChange={this.onChange}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          value={email}
          onChange={this.onChange}
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Enter your email address" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          value={password}
          onChange={this.onChange}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={this.onChange}
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" disabled={isInvalid} htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
        {error && <Alert message={error.message} type="error" showIcon />}
      </Form>
    );
  }
}

const SignUpLink = () => (
  <p>
    {'Don\'t have an account? '}
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export { SignUpForm, SignUpLink };
