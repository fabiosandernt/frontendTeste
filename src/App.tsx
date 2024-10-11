import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './features/Home/HomePage';
import InsumosPage from './features/Insumos/InsumosPage';
import InsumoEdit from './features/Insumos/InsumoEdit';  // Importa a página de edição de insumo
import SideBar from './components/SideBar';  // Importa o componente SideBar
import { Container } from 'react-bootstrap';
import './App.css'; // Certifique-se de importar os estilos

const App: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Router>
      <div className={`d-flex app-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`} style={{ minHeight: '100vh' }}>
        {/* Sidebar Responsiva */}
        <SideBar collapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

        {/* Conteúdo Principal */}
        <div className="main-content flex-grow-1" style={{ padding: '24px' }}>
          <Container>
            <Routes>
              <Route path="/insumos" element={<InsumosPage />} />
              <Route path="/insumos/editar/:id" element={<InsumoEdit />} /> {/* Rota de edição adicionada */}
              <Route path="/gabarito" element={<div>Gabarito Page</div>} />
              <Route path="/pmo" element={<div>PMO Page</div>} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
