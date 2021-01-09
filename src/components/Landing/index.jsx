import * as React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export default function Landing() {
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
        Landing
      </Content>
    </Layout>
  );
}
