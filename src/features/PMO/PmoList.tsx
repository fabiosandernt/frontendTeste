import React, { useState } from 'react';
import { Table, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchPmos, excluirPmo, incluirPmo } from '../../services/PmoService';
import { PmoDto, PmoFilter, DadosPmoDto, PMOManterModel, SemanaOperativaModel } from '../../models/PmoDto';
import './Pmo.css';

// Função para converter base64 para Uint8Array
const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const PmoList: React.FC = () => {
  const [pmos, setPmos] = useState<PMOManterModel[]>([]);
  const [dadosPmo, setDadosPmo] = useState<Record<number, DadosPmoDto>>({});
  const [loading, setLoading] = useState(false);
  const [backendMessage, setBackendMessage] = useState<string | null>(null);
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
  const fetchFilteredPmos = async () => {
    if (!filters.anoReferencia || !filters.mesReferencia) {
      alert('Por favor, selecione um Ano e Mês antes de buscar.');
      return;
    }

    setPmos([]);
    setDadosPmo({});
    setBackendMessage(null);
    setLoading(true);

    try {
      const data = await fetchPmos({ ...filters, qtdMesesadiante: mesesFrente });
      setPmos(data);

      // Mapeia os dados de exclusão por ID de PMO
      const novosDadosPmo: Record<number, DadosPmoDto> = {};
      data.forEach((pmo) => {
        novosDadosPmo[pmo.id] = {
          idPMO: pmo.id,
          versaoPMO: base64ToUint8Array(pmo.versaoPmoString || ''), // Converte para Uint8Array
        };
      });
      setDadosPmo(novosDadosPmo);
    } catch (error: any) {
      if (error.message) {
        setBackendMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para incluir um novo PMO
  const handleIncluirPmo = async () => {
    const { anoReferencia, mesReferencia } = filters;
  
    if (!anoReferencia || !mesReferencia) {
      alert('Por favor, selecione um Ano e Mês antes de incluir o PMO.');
      return;
    }
  
    setLoading(true);
    setBackendMessage(null);
  
    try {
      await incluirPmo(anoReferencia, mesReferencia);
      alert('PMO incluído com sucesso!');
      fetchFilteredPmos(); // Atualiza a lista
    } catch (error: any) {
      // Exibe apenas a mensagem recebida do backend
      setBackendMessage(typeof error === 'string' ? error : null);
    } finally {
      setLoading(false);
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

  const handleEditSemana = (id: number, semana: SemanaOperativaModel) => {
    const { idSemanaOperativa, dataReuniao, dataInicioManutencao, dataFimManutencao } = semana;
    const stateToSend = { idSemanaOperativa, dataReuniao, dataInicioManutencao, dataFimManutencao };

    navigate(`/pmo/${id}/semana-operativa/edit`, {
      state: { semana: stateToSend },
    });
  };

  // Função para excluir um PMO
  const handleDeletePmo = async (idPmo: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este PMO?')) return;

    setLoading(true);
    setBackendMessage(null);

    try {
      const dados = dadosPmo[idPmo];
      if (!dados) throw new Error('Dados para exclusão não encontrados.');

      await excluirPmo(dados); // Envia o DTO no formato esperado
      setPmos((prevPmos) => prevPmos.filter((pmo) => pmo.id !== idPmo)); // Atualiza a lista localmente
      setDadosPmo((prevDados) => {
        const { [idPmo]: _, ...rest } = prevDados;
        return rest;
      });
    } catch (error: any) {
      if (error.message) {
        setBackendMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
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
        <Button variant="secondary" className="ml-2" onClick={handleToggleSemanas}>
          {showSemanasOperativas ? 'Ocultar Semanas Operativas' : 'Ver Semanas Operativas'}
        </Button>
        <Button variant="success" className="ml-2" onClick={handleIncluirPmo}>
          Incluir PMO
        </Button>
      </Form>

      <div className="table-responsive mt-4">
        {backendMessage && <p className="text-center text-danger">{backendMessage}</p>}
        {pmos.length > 0 &&
          pmos.map((pmo) => (
            <div key={pmo.id} className="mb-4">
              <h3>
                PMO{' '}
                {new Date(0, pmo.mesReferencia - 1).toLocaleString('pt-BR', { month: 'long' })}{' '}
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
                    {pmo.semanasOperativas?.map((semana) => (
                      <tr key={semana.idSemanaOperativa}>
                        <td>{semana.idSemanaOperativa}</td>
                        <td>{new Date(semana.dataReuniao).toLocaleDateString('pt-BR')}</td>
                        <td>{new Date(semana.dataInicioManutencao).toLocaleDateString('pt-BR')}</td>
                        <td>{new Date(semana.dataFimManutencao).toLocaleDateString('pt-BR')}</td>
                        <td>
                          <Button
                            className="edit-button"
                            onClick={() => handleEditSemana(pmo.id, semana)}
                          >
                            Editar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <Button
                variant="danger"
                className="mt-2"
                onClick={() => handleDeletePmo(pmo.id)}
              >
                Excluir
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PmoList;
