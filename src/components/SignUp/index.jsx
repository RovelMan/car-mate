import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Layout } from 'antd';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Alert, Form, Input, Button } from 'antd';

const { Content } = Layout;
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
        <h1>Sign Up</h1>
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

  onFinish = (e) => {
    const { username, email, password } = this.state;
 
    this.props.firebase
      .doCreateUser(email, password)
      .then(authUser => {
        console.log(authUser);
        this.setState({
          username,
          email,
          password
        });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onFinishFailed = (e) => {

  }

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      error,
    } = this.state;

    const isInvalid =
      password !== confirmPassword ||
      password === '' ||
      email === '' ||
      username === '';

    return (
      <Form
        {...layout}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
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
    )
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
) (SignUpFormBase);

export { SignUpForm, SignUpLink };
