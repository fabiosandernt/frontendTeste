import React from 'react';
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';  // Usando os componentes do Bootstrap
import { Link } from 'react-router-dom';
import './SideBar.css';  // Importando o CSS da SideBar

interface SideBarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ collapsed, toggleSidebar }) => {
  return (
    <>
      {/* Botão hambúrguer para abrir/fechar a sidebar */}
      <Button variant="dark" onClick={toggleSidebar} className="hamburger-btn">
        ☰
      </Button>

      {/* Sidebar */}
      <Navbar bg="dark" variant="dark" expand="lg" className={`d-flex flex-column sidebar ${collapsed ? 'collapsed' : ''}`} style={{ height: '100vh', position: 'fixed', top: 0, left: 0, transition: 'width 0.3s' }}>
        <Nav className="flex-column">
          <Navbar.Brand as={Link} to="/">WebPMO</Navbar.Brand>

          <NavDropdown title="Administração" id="admin-dropdown">
            <NavDropdown.Item as={Link} to="/extracao-log-auditoria">Extração Log Auditoria</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/log-notificacao">Log Notificação</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Configuração" id="config-dropdown">
            <NavDropdown.Item as={Link} to="/insumos">Insumos</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/gabarito">Gabarito</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/pmo">PMO</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Estudo" id="estudo-dropdown">
            <NavDropdown.Item as={Link} to="/informar-dados">Informar Dados</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/monitorar-estudo">Monitorar Estudo</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/convergir-pld">Convergir PLD</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Modelos" id="admin-dropdown">
            <NavDropdown.Item as={Link} to="/extracao-log-auditoria">ModeloDecomp</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/log-notificacao">Automação</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Publicação" id="admin-dropdown">
            <NavDropdown.Item as={Link} to="/extracao-log-auditoria">Configurar</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/log-notificacao">Importação</NavDropdown.Item>
          </NavDropdown>


        </Nav>
      </Navbar>
    </>
  );
};

export default SideBar;
