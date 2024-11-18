import React from 'react';
import { Container } from 'react-bootstrap';
import PmoList from './PmoList';

const PmoPage: React.FC = () => {
  return (
    <Container>
      <h2>PMO</h2>
      <PmoList />
    </Container>
  );
};

export default PmoPage;
