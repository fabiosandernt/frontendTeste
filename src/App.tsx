import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './features/Home/HomePage';
import InsumosPage from './features/Insumos/InsumosPage';
import SideBar from './components/SideBar';  // Importa o componente SideBar
import './App.css';  // Importa o CSS global

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <SideBar />  {/* Adiciona a SideBar */}
        <div className="App-content">  {/* Conteúdo principal da aplicação */}
          <Routes>
            <Route path="/insumos" element={<InsumosPage />} />
            <Route path="/gabarito" element={<div>Gabarito Page</div>} />
            <Route path="/pmo" element={<div>PMO Page</div>} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
