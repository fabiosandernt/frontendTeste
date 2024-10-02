import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideBar: React.FC = () => {
  const [isConfigOpen, setIsConfigOpen] = useState(true);

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white" style={{ width: '280px', height: '100vh', position: 'fixed', background: '#1C3A57' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-5">Configuração</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {/* Configuração Section */}
        <li className="nav-item mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed text-white"
            data-bs-toggle="collapse"
            data-bs-target="#config-collapse"
            aria-expanded={isConfigOpen}
            onClick={() => setIsConfigOpen(!isConfigOpen)}
          >
            Configuração
          </button>
          <div className={`collapse ${isConfigOpen ? 'show' : ''}`} id="config-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><Link to="/insumos" className="link-light rounded">Insumos</Link></li>
              <li><Link to="/gabarito" className="link-light rounded">Gabarito</Link></li>
              <li><Link to="/pmo" className="link-light rounded">PMO</Link></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
