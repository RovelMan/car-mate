import * as React from 'react';
import { Layout, Typography } from 'antd';

// import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function Admin() {
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
        <Title>Admin</Title>
        <Paragraph>
          Restricted area! Only users with the admin role are authorized.
        </Paragraph>
      </Content>
    </Layout>
  );
}

// const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Admin);
