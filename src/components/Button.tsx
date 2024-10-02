import React from 'react';
import './Button.css';  // Importa o CSS do botão

// Definimos a interface para as propriedades esperadas
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
