import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './features/Home/HomePage';
import InsumosPage from './features/Insumos/InsumosPage';
import SideBar from './components/SideBar';  // Importa o componente SideBar
import { Layout } from 'antd';  // Ant Design Layout

const { Sider, Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}> {/* Altura mínima de 100vh para garantir que preenche toda a tela */}
        
        {/* Sidebar Responsivo */}
        <Sider
          width={240}  // Define a largura da sidebar
          breakpoint="lg"  // Responsivo para larguras maiores
          collapsedWidth="0"  // Permite recolher o sidebar em telas menores
        >
          <SideBar />
        </Sider>

        {/* Conteúdo Principal */}
        <Layout>
          <Content style={{ padding: '24px' }}>  {/* Removido marginLeft para deixar responsivo */}
            <Routes>
              <Route path="/insumos" element={<InsumosPage />} />
              <Route path="/gabarito" element={<div>Gabarito Page</div>} />
              <Route path="/pmo" element={<div>PMO Page</div>} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
