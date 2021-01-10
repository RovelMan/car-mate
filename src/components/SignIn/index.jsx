import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Alert, Form, Input, Layout, Button } from 'antd';

const { Content } = Layout;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};
export default function SignIn() {
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
        <h1>Sign In</h1>
        <SignInForm />
        <SignUpLink />
      </Content>
    </Layout>
  );
}

class SignInFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onFinish = (e) => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignIn(email, password)
      .then(() => {
        this.setState({
          email,
          password
        });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <Form {...layout} onFinish={this.onFinish} >
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
        <Form.Item {...tailLayout}>
          <Button type="primary" disabled={isInvalid} htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
        {error && <Alert message={error.message} type="error" showIcon />}
      </Form>
    )
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
) (SignInFormBase);

export { SignInForm };
