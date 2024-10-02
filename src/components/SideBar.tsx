import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';  // Importa os estilos da SideBar

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // A sidebar estará aberta por padrão em telas grandes

  // Função para alternar a sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Verifica o tamanho da tela para manter a sidebar aberta em telas grandes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true); // Sidebar sempre aberta em telas maiores
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Chama a função quando o componente é montado

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Botão para abrir/fechar a sidebar em telas menores */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar, mostra ou esconde baseado no estado */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h2>Navegação</h2>
        <ul>
          <li>
            <strong>Configuração</strong>
            <ul>
              <li><Link to="/insumos">Insumos</Link></li>
              <li><Link to="/gabarito">Gabarito</Link></li>
              <li><Link to="/pmo">PMO</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
