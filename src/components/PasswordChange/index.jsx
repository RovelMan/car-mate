import * as React from 'react';
import {
  Alert, Button, Form, Input, Layout, Typography,
} from 'antd';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

const { Content } = Layout;
const { Title } = Typography;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

export default function PasswordChange() {
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
        <Title level={3}>Password Change</Title>
        <PasswordChangeForm />
      </Content>
    </Layout>
  );
}

class PasswordChangeBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      error: null,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onFinish = () => {
    const { password } = this.state;
    const { firebase } = this.props;
    firebase
      .doPasswordUpdate(password)
      .then(() => {
        this.setState({ password });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    const { password, confirmPassword, error } = this.state;
    const isInvalid = password !== confirmPassword || password === '';
    return (
      <Form {...layout} onFinish={this.onFinish}>
        <Form.Item
          label="Password"
          name="password"
          value={password}
          onChange={this.onChange}
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password placeholder="Enter your new password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={this.onChange}
          rules={[{ required: true, message: 'Please confirm your new password!' }]}
        >
          <Input.Password placeholder="Confirm your new password" />
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

const PasswordChangeForm = compose(
  withFirebase,
)(PasswordChangeBase);

export { PasswordChangeForm };
