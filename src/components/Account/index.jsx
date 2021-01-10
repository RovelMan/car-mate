import * as React from 'react';
import { Layout, Typography } from 'antd';

import { PasswordChangeForm } from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';

const { Content } = Layout;
const { Title } = Typography;

export default function Account() {
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
        <Title>Account</Title>
        <Title level={3}>Password Forget</Title>
        <PasswordForgetForm />
        <Title level={3}>Password Change</Title>
        <PasswordChangeForm />
      </Content>
    </Layout>
  );
}
