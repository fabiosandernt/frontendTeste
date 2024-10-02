import React from 'react';
import InsumosList from './InsumosList';  // Importa o componente que lista os insumos
import 'bootstrap/dist/css/bootstrap.min.css';
const InsumosPage: React.FC = () => {
  return (
    <div>
      <h1>Insumos</h1>
      <InsumosList />
    </div>
  );
};

export default InsumosPage;
