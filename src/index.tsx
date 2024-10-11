import React from 'react';
import ReactDOM from 'react-dom/client'; // Usando react-dom/client no React 18
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap

// Substitua ReactDOM.render pelo novo createRoot
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
