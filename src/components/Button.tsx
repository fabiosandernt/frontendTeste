import React from 'react';
import './Button.css'; // Arquivo de estilo para o botão
import 'bootstrap/dist/css/bootstrap.min.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
  tableButton?: boolean; // Propriedade opcional para determinar se é um botão de tabela
}

const Button: React.FC<ButtonProps> = ({ label, onClick, tableButton = false }) => {
  return (
    <button
      className={`custom-button ${tableButton ? 'table-button' : ''}`} // Aplica a classe 'table-button' se for um botão de tabela
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
