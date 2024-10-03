import React from 'react';
import InsumosList from './InsumosList';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const InsumosPage: React.FC = () => {
  return (
    <Layout>
      <Content >
        <Title level={2}>Insumos</Title>
        <InsumosList />
      </Content>
    </Layout>
  );
};

export default InsumosPage;
