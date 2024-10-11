import React from 'react';
import { Container } from 'react-bootstrap';  // Importando Container do Bootstrap
import './HomePage.css';  // Estilos para a HomePage

const HomePage: React.FC = () => {
  return (
    <Container className="mt-4">  {/* Usando Container do Bootstrap */}
      <h1>Bem-vindo à HomePage</h1>
      <p>Use a barra lateral para navegar entre as páginas do sistema.</p>
    </Container>
  );
};

export default HomePage;
