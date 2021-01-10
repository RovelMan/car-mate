import * as React from 'react';
import { Layout, Typography } from 'antd';

import { PasswordChangeForm } from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';
import AuthUserContext, { withAuthorization } from '../Session';

const { Content } = Layout;
const { Title } = Typography;

function Account() {
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
        <AuthUserContext.Consumer>
          {(authUser) => (
            <div>
              <Title>{`Account: ${authUser.email}`}</Title>
              <Title level={3}>Password Forget</Title>
              <PasswordForgetForm />
              <Title level={3}>Password Change</Title>
              <PasswordChangeForm />
            </div>
          )}
        </AuthUserContext.Consumer>
      </Content>
    </Layout>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Account);
