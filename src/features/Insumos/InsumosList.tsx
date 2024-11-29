import React, { useState } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirecionamento
import PaginationComponent from '../../components/PaginationComponent';
import { fetchInsumos } from '../../services/InsumoService';
import { VisualizarInsumoModel } from '../../models/VisualizarInsumoModel';
import './Insumos.css';

const InsumosList: React.FC = () => {
  const [insumos, setInsumos] = useState<VisualizarInsumoModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    Nome: '',        // Nome do insumo
    SglInsumo: '',   // Sigla do insumo
    TipInsumopmo: '', // Tipo do insumo
    Limit: 10,
    Offset: 0,
    Sort: '',
  });
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate(); // Inicializa o hook para redirecionamento

  // Função para buscar os insumos com os filtros aplicados
  const fetchFilteredInsumos = () => {
    setLoading(true);
    fetchInsumos(filters)
      .then(data => {
        setInsumos(data);
        setTotalCount(100); // Ajuste conforme necessário
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar insumos:", error);
        setLoading(false);
      });
  };

  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };
  

  const handlePageChange = (newPage: number) => {
    const newOffset = (newPage - 1) * filters.Limit;
    setFilters(prevFilters => ({ ...prevFilters, Offset: newOffset }));
    setCurrentPage(newPage);
    fetchFilteredInsumos(); // Recarrega os dados ao mudar de página
  };

  const handleEdit = (id: number) => {
    console.log("ID do insumo:", id); // Adiciona o console.log para mostrar o ID
    navigate(`/insumos/editar/${id}`); // Redireciona para a tela de edição passando o ID
  };

  const handleDelete = (id: number) => {
    console.log(`Excluir insumo com ID: ${id}`);
    // Lógica para excluir o item
  };

  return (
    <div>
      {/* Formulário de Filtros */}
      <Form>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="filterNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="Nome"
                value={filters.Nome}
                onChange={handleFilterChange}
                placeholder="Nome do Insumo"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="filterSigla">
              <Form.Label>Sigla</Form.Label>
              <Form.Control
                type="text"
                name="SglInsumo"
                value={filters.SglInsumo}
                onChange={handleFilterChange}
                placeholder="Sigla do Insumo"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="filterTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                name="TipInsumopmo"
                value={filters.TipInsumopmo}
                onChange={handleFilterChange}
              >
                <option value="">Selecione o Tipo</option>
                <option value="E">Estruturado</option>
                <option value="L">Não Estruturado</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={fetchFilteredInsumos}>Buscar</Button>
      </Form>

      {/* Tabela de Insumos */}
      <div className="table-responsive mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ordem</th>
              <th>Tipo</th>
              <th>Nome</th>
              <th>Sigla</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {insumos.map(insumo => (
              <tr key={insumo.id}>
                <td>{insumo.ordemExibicao}</td>
                <td>{insumo.tipoInsumo === 'E' ? 'Estruturado' : 'Não Estruturado'}</td>
                <td>{insumo.nome}</td>
                <td>{insumo.siglaInsumo}</td>
                <td>
                  <Button className="edit-button" onClick={() => handleEdit(insumo.id)}>Editar</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(insumo.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Paginação */}
      <PaginationComponent
        currentPage={currentPage}
        totalItems={totalCount}
        itemsPerPage={filters.Limit}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default InsumosList;
