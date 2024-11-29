import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SideBar from './components/SideBar';
import HomePage from './features/Home/HomePage';
import InsumosPage from './features/Insumos/InsumosPage';
import PmoPage from './features/PMO/PmoPage';
import SemanaOperativaEdit from './features/PMO/SemanaOperativaEdit'; // Importação do componente de edição
import LoadingIndicator from './components/LoadingIndicator'; // Componente de carregamento
import './App.css';

const App: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Controle global de carregamento

  // Alterna o estado da sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
  };

  return (
    <Router>
      <div
        className={`d-flex app-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
        style={{ minHeight: '100vh' }}
      >
        {/* Sidebar Responsiva */}
        <SideBar collapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

        {/* Conteúdo Principal */}
        <div className="main-content flex-grow-1" style={{ padding: '24px' }}>
          <Container>
            {/* Substitua o texto "Carregando..." pelo componente LoadingIndicator */}
            {isLoading && <LoadingIndicator message="Carregando aplicação..." />}
            <Routes>
              {/* Rotas Configuradas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/insumos" element={<InsumosPage />} />              
              <Route path="/pmo" element={<PmoPage />} />
              {/* Nova Rota para Editar Semana Operativa */}
              <Route path="/pmo/:idPmo/semana-operativa/edit" element={<SemanaOperativaEdit />} />
              <Route path="/gabarito" element={<div>Gabarito Page</div>} />
            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
};

export default App;
