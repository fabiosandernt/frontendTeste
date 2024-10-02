import React, { useState } from 'react';
import { fetchInsumos } from '../../services/InsumoService';
import { InsumoDto } from '../../models/InsumoDto';
import Button from '../../components/Button'; // Importa o botão reutilizável
import Pagination from '../../components/Pagination'; // Importa o componente de paginação
import './InsumosList.css'; // Estilos para a tabela

const InsumosList: React.FC = () => {
  const [insumos, setInsumos] = useState<InsumoDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    NomInsumopmo: '',
    SglInsumo: '',
    TipInsumopmo: '',
    Limit: 10, // Limite de itens por página
    Offset: 0, // Paginação inicial
    Sort: '',
  });
  const [totalCount, setTotalCount] = useState(0); // Total de itens retornados pela API
  const [currentPage, setCurrentPage] = useState(1); // Página atual

  // Função chamada ao clicar no botão "Buscar"
  const fetchFilteredInsumos = () => {
    setLoading(true);
    fetchInsumos(filters).then(data => {
      setInsumos(data); // A API retorna diretamente os itens
      setTotalCount(100); // Defina um total fictício ou ajustável
      setLoading(false);
    }).catch(error => {
      console.error("Erro ao buscar insumos:", error);
      setLoading(false);
    });
  };

  // Função para editar um insumo
  const handleEdit = (id: number) => {
    console.log(`Editar insumo com ID: ${id}`);
    // Aqui você pode redirecionar para uma página de edição ou abrir um modal de edição
  };

  // Função para excluir um insumo
  const handleDelete = (id: number) => {
    console.log(`Excluir insumo com ID: ${id}`);
    // Aqui você pode chamar a função de exclusão da API
  };

  // Função para atualizar os filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  // Função chamada ao clicar no botão de buscar
  const handleClick = () => {
    setFilters({ ...filters, Offset: 0 }); // Reiniciar Offset ao aplicar filtro
    setCurrentPage(1); // Reiniciar a paginação ao buscar
    fetchFilteredInsumos(); // Chama a função para buscar os insumos com os filtros
  };

  // Função para mudar de página
  const handlePageChange = (newPage: number) => {
    const newOffset = (newPage - 1) * filters.Limit; // Calcula o offset com base na nova página
    setFilters(prevFilters => ({ ...prevFilters, Offset: newOffset }));
    setCurrentPage(newPage); // Atualiza a página atual
    fetchFilteredInsumos(); // Faz a requisição para a nova página
  };

  // Calcular o total de páginas
  const totalPages = Math.ceil(totalCount / filters.Limit);

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
            <th>Ações</th> {/* Mover a coluna de ações para o final */}
          </tr>
        </thead>
        <tbody>
          {insumos.map(insumo => (
            <tr key={insumo.idInsumopmo}>
              <td>{insumo.numOrdemexibicao}</td>
              <td>{insumo.tipInsumopmo === 'E' ? 'Estruturado' : 'Não Estruturado'}</td> {/* Ajuste do tipo */}
              <td>{insumo.nomInsumopmo}</td>
              <td>{insumo.sglInsumo}</td>
              <td>{insumo.flgExportainsumo ? 'Sim' : 'Não'}</td>
              <td>{insumo.flgPreaprovado ? 'Sim' : 'Não'}</td>
              <td>{insumo.flgAtivo ? 'Sim' : 'Não'}</td>
              <td>
                <Button label="Editar" onClick={() => handleEdit(insumo.idInsumopmo)} />
                <Button label="Excluir" onClick={() => handleDelete(insumo.idInsumopmo)} />
              </td> {/* Botões de ação no final */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default InsumosList;
