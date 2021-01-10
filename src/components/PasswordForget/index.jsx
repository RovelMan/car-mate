import * as React from 'react';
import {
  Alert, Button, Form, Input, Layout,
} from 'antd';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const { Content } = Layout;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

export default function PasswordForget() {
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
        <h1>Password Forget</h1>
        <PasswordForgetForm />
      </Content>
    </Layout>
  );
}

class PasswordForgetBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: null,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onFinish = () => {
    const { email } = this.state;
    const { firebase } = this.props;
    firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ email });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <Form {...layout} onFinish={this.onFinish}>
        <Form.Item
          label="Email"
          name="email"
          value={email}
          onChange={this.onChange}
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Enter your email address" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" disabled={isInvalid} htmlType="submit">
            Reset My Password
          </Button>
        </Form.Item>
        {error && <Alert message={error.message} type="error" showIcon />}
      </Form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const PasswordForgetForm = compose(
  withFirebase,
)(PasswordForgetBase);

export { PasswordForgetForm, PasswordForgetLink };
