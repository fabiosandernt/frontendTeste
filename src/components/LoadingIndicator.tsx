import React from 'react';

interface LoadingIndicatorProps {
  message?: string; // Mensagem opcional para exibir junto ao Spinner
  type?: 'border' | 'grow'; // Tipo de spinner: border ou grow
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message, type = 'border' }) => {
  const spinnerClass = type === 'border' ? 'spinner-border' : 'spinner-grow';

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '200px' }}>
      <div className={`${spinnerClass}`} style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default LoadingIndicator;
