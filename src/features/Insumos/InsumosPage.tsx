import React from 'react';
import { Container } from 'react-bootstrap';
import InsumosList from './InsumosList';

const InsumosPage: React.FC = () => {
  return (
    <Container>
      <h2>Insumos</h2>
      <InsumosList />
    </Container>
  );
};

export default InsumosPage;
