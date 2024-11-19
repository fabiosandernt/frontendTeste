import React from 'react';
import { Container } from 'react-bootstrap';
import PmoList from './PmoList';

const PmoPage: React.FC = () => {
  return (
    <Container>
      {/* <h3>PMO</h3> */}
      <PmoList />
    </Container>
  );
};

export default PmoPage;
