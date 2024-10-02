import React, { useState } from 'react';
import { fetchInsumos } from '../../services/InsumoService';
import { InsumoDto } from '../../models/InsumoDto';
import Button from '../../components/Button'; // Importa o botão reutilizável
import './InsumosList.css'; // Estilos para a tabela

const InsumosList: React.FC = () => {
  const [insumos, setInsumos] = useState<InsumoDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    NomInsumopmo: '',
    SglInsumo: '',
    TipInsumopmo: '',
    Limit: 10,
    Offset: 0,
    Sort: '',
  });

  // Função chamada ao clicar no botão "Buscar"
  const fetchFilteredInsumos = () => {
    setLoading(true);
    fetchInsumos(filters).then(data => {
      setInsumos(data);
      setLoading(false);
    }).catch(error => {
      console.error("Erro ao buscar insumos:", error);
      setLoading(false);
    });
  };

  // Função para atualizar os filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  // Função chamada ao clicar no botão de buscar
  const handleClick = () => {
    setFilters({ ...filters, Offset: 0 }); // Reiniciar Offset ao aplicar filtro
    fetchFilteredInsumos(); // Chama a função para buscar os insumos com os filtros
  };

  if (loading) {
    return <p>Carregando insumos...</p>;
  }

  return (
    <div className="insumos-list-container">
      <h1>Lista de Insumos</h1>

      {/* Filtros */}
      <form className="filter-form">
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="NomInsumopmo"
            value={filters.NomInsumopmo}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Símbolo:</label>
          <input
            type="text"
            name="SglInsumo"
            value={filters.SglInsumo}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Tipo:</label>
          <input
            type="text"
            name="TipInsumopmo"
            value={filters.TipInsumopmo}
            onChange={handleFilterChange}
          />
        </div>
        <Button label="Buscar" onClick={handleClick} />
      </form>

      {/* Tabela de Insumos */}
      <table className="insumos-table">
        <thead>
          <tr>
            <th>Ordem</th>
            <th>Tipo</th>
            <th>Nome</th>
            <th>Sigla</th>
            <th>Exportar</th>
            <th>Pré-aprovado</th>
            <th>Ativo</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map(insumo => (
            <tr key={insumo.idInsumopmo}>
              <td>{insumo.numOrdemexibicao}</td>
              <td>{insumo.tipInsumopmo}</td>
              <td>{insumo.nomInsumopmo}</td>
              <td>{insumo.sglInsumo}</td>
              <td>{insumo.flgExportainsumo ? 'Sim' : 'Não'}</td>
              <td>{insumo.flgPreaprovado ? 'Sim' : 'Não'}</td>
              <td>{insumo.flgAtivo ? 'Sim' : 'Não'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InsumosList;
