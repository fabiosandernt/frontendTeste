import React, { useState } from 'react';
import { Table, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchPmos, incluirPmo } from '../../services/PmoService';
import { PmoDto, PmoFilter, SemanaOperativaDto } from '../../models/PmoDto';
import './Pmo.css';

const PmoList: React.FC = () => {
  const [pmos, setPmos] = useState<PmoDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<PmoFilter>({
    anoReferencia: undefined,
    mesReferencia: undefined,
    limit: 10,
    offset: 0,
    sort: '',
  });
  const [mesesFrente, setMesesFrente] = useState(1);
  const [showSemanasOperativas, setShowSemanasOperativas] = useState(false);
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  // Função para buscar PMOs com filtros
  const fetchFilteredPmos = () => {
    if (!filters.anoReferencia || !filters.mesReferencia) {
      alert('Por favor, selecione um Ano e Mês antes de buscar.');
      return;
    }

    setLoading(true);
    fetchPmos({ ...filters, qtdMesesadiante: mesesFrente })
      .then((data) => {
        setPmos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar PMOs:', error);
        setLoading(false);
      });
  };

  // Função para incluir um novo PMO
  const handleIncluirPmo = async () => {
    if (!filters.anoReferencia || !filters.mesReferencia) {
      alert('Por favor, selecione um Ano e Mês antes de incluir um PMO.');
      return;
    }

    try {
      await incluirPmo(filters.anoReferencia, filters.mesReferencia);
      alert('PMO incluído com sucesso!');
    } catch (error) {
      console.error('Erro ao incluir PMO:', error);
      alert('Erro ao incluir o PMO.');
    }
  };

  // Manipulação de filtros
  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value ? Number(value) : undefined,
    }));
  };

  // Alternar exibição de semanas operativas
  const handleToggleSemanas = () => {
    setShowSemanasOperativas((prev) => !prev);
  };

  // Navegar para a edição da semana operativa
  const handleEditSemana = (idPmo: number, semana: SemanaOperativaDto) => {
    const { idSemanaoperativa, datReuniao, datIniciomanutencao, datFimmanutencao } = semana;
    const stateToSend = { idSemanaoperativa, datReuniao, datIniciomanutencao, datFimmanutencao };

    console.log('Navegando para edição com os dados:', stateToSend);

    navigate(`/pmo/${idPmo}/semana-operativa/edit`, {
      state: { semana: stateToSend },
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="filterAnoReferencia">
              <Form.Label>Ano de Referência</Form.Label>
              <Form.Control
                as="select"
                name="anoReferencia"
                value={filters.anoReferencia || ''}
                onChange={handleFilterChange}
              >
                <option value="">Selecione o Ano</option>
                {Array.from({ length: currentYear - 1870 + 2 }, (_, i) => 1870 + i)
                  .filter((ano) => ano <= currentYear + 1)
                  .reverse()
                  .map((ano) => (
                    <option key={ano} value={ano}>
                      {ano}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="filterMesReferencia">
              <Form.Label>Mês de Referência</Form.Label>
              <Form.Control
                as="select"
                name="mesReferencia"
                value={filters.mesReferencia || ''}
                onChange={handleFilterChange}
              >
                <option value="">Selecione o Mês</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('pt-BR', { month: 'long' })}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={fetchFilteredPmos}>
          Buscar
        </Button>
        <Button
          variant="success"
          className="ml-2"
          onClick={handleIncluirPmo}
        >
          Incluir PMO
        </Button>
        <Button
          variant="secondary"
          className="ml-2"
          onClick={handleToggleSemanas}
        >
          {showSemanasOperativas ? 'Ocultar Semanas Operativas' : 'Ver Semanas Operativas'}
        </Button>
      </Form>

      <div className="table-responsive mt-4">
        {pmos.map((pmo) => (
          <div key={pmo.idPmo} className="mb-4">
            <h3>
              PMO {new Date(0, pmo.mesReferencia - 1).toLocaleString('pt-BR', { month: 'long' })}{' '}
              {pmo.anoReferencia}
            </h3>
            {showSemanasOperativas && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Data da Reunião</th>
                    <th>Início Manutenções</th>
                    <th>Término Manutenções</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pmo.tbSemanaoperativas.map((semana) => (
                    <tr key={semana.idSemanaoperativa}>
                      <td>{semana.idSemanaoperativa}</td>
                      <td>{new Date(semana.datReuniao).toLocaleDateString('pt-BR')}</td>
                      <td>{new Date(semana.datIniciomanutencao).toLocaleDateString('pt-BR')}</td>
                      <td>{new Date(semana.datFimmanutencao).toLocaleDateString('pt-BR')}</td>
                      <td>
                        <Button
                          className="edit-button"
                          onClick={() => handleEditSemana(pmo.idPmo, semana)}
                        >
                          Editar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PmoList;
