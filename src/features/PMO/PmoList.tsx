import React, { useState } from 'react';
import { Table, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchPmos, excluirPmo, incluirPmo } from '../../services/PmoService';
import { PmoFilter, DadosPmoDto, PMOManterModel, SemanaOperativaModel } from '../../models/PmoDto';
import { excluirSemanaOperativa } from '../../services/PmoService';
import { AberturaEstudoModel } from '../../models/AberturaEstudoModel';
import { carregarAbrirEstudo, abrirEstudo } from '../../services/PmoService';
import EstudoModal from '../../components/EstudoModal';
import { EstudoModalProps } from '../../models/EstudoModalProps'; 
import './Pmo.css';
import { EscolhaGabaritoModel, SelectListItem } from '../../models/EscolhaGabaritoModel'; // Ajuste o caminho conforme necessário


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
  // Estados principais do componente
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

  // Estados relacionados ao modal
  const [showModal, setShowModal] = useState(false);
  const [estudosDisponiveis, setEstudosDisponiveis] = useState<Array<{ id: number; nome: string }>>([]);
  const [dadosEstudo, setDadosEstudo] = useState<AberturaEstudoModel | null>(null);

  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

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
      const data: PMOManterModel[] = await fetchPmos({ ...filters, qtdMesesadiante: mesesFrente });
      console.log("Dados retornados pela API:", data);
  
      const novosDadosPmo: Record<number, DadosPmoDto> = {};
      const estudosDisponiveis: Array<{ id: number; nome: string }> = [];
  
      data.forEach((pmo) => {
        // Atualiza os dados do PMO
        novosDadosPmo[pmo.id] = {
          idPMO: pmo.id,
          versaoPMO: pmo.versao,
        };
  
        // Adiciona as semanas operativas ao array de estudos disponíveis
        pmo.semanasOperativas.forEach((semana) => {
          estudosDisponiveis.push({
            id: semana.idSemanaOperativa,
            nome: semana.nomeSemanaOperativa, // Campo nome que será exibido no select da modal
          });
        });
      });
  
      setPmos(data);
      setDadosPmo(novosDadosPmo);
  
      // Atualiza os estudos disponíveis para o modal
      setEstudosDisponiveis(estudosDisponiveis);
    } catch (error: any) {
      console.error("Erro ao buscar PMOs:", error);
      if (error.message) setBackendMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  

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
      fetchFilteredPmos();
    } catch (error: any) {
      setBackendMessage(typeof error === 'string' ? error : null);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value ? Number(value) : undefined,
    }));
  };

  const handleToggleSemanas = () => {
    setShowSemanasOperativas((prev) => !prev);
  };


  const handleEditSemana = (id: number, semana: SemanaOperativaModel) => {
    navigate(`/pmo/${id}/semana-operativa/edit`, {
      state: {
        idPMO: id, // Inclui o IdPMO
        semana: {
          idSemanaOperativa: semana.idSemanaOperativa,
          dataReuniao: semana.dataReuniao,
          dataInicioManutencao: semana.dataInicioManutencao,
          dataFimManutencao: semana.dataFimManutencao,
        },
      },
    });
  };
  
  

  const handleAbrirEstudo = async (pmoId: number, idSemanaOperativa: number, versaoPmoString: string) => {
    setLoading(true);
    setBackendMessage(null);
  
    try {
      const estudo: AberturaEstudoModel = {
        idPMO: pmoId,
        idSemanaOperativa: idSemanaOperativa,
        versaoPmoString: versaoPmoString,
      };
  
      // Chama a API para carregar os dados do estudo
      const dadosCarregados: EscolhaGabaritoModel = await carregarAbrirEstudo(estudo);
  
      console.log('Estudo carregado com sucesso:', dadosCarregados);
  
      // Mapeia os dados para o formato esperado
      const estudos = dadosCarregados.estudos.map((item: SelectListItem) => ({
        id: typeof item.value === 'number' ? item.value : parseInt(item.value as string, 10),
        nome: item.text,
      }));
      
  
      // Atualiza o estado com os dados mapeados
      setDadosEstudo({
        idPMO: pmoId,
        idSemanaOperativa: idSemanaOperativa,
        versaoPmoString: versaoPmoString,
      });
      setEstudosDisponiveis(estudos);
      setShowModal(true);
    } catch (error: any) {
      console.error('Erro ao carregar os dados para abrir o estudo:', error);
      alert(error.message || 'Erro ao carregar os dados do estudo.');
    } finally {
      setLoading(false);
    }
  };
  
  
  

  
  

  const handleExcluirSemana = async (pmoId: number, idSemanaOperativa: number) => {
    if (!window.confirm(`Deseja realmente excluir a Semana Operativa ID: ${idSemanaOperativa}?`)) return;
  
    try {
      setLoading(true);
      await excluirSemanaOperativa({
        IdSemanaOperativa: idSemanaOperativa,
        IdPMO: pmoId,
        VersaoPmoString: dadosPmo[pmoId]?.versaoPMO || '',
      });
  
      setPmos((prevPmos) =>
        prevPmos.map((pmo) =>
          pmo.id === pmoId
            ? {
                ...pmo,
                semanasOperativas: pmo.semanasOperativas.filter(
                  (semana) => semana.idSemanaOperativa !== idSemanaOperativa
                ),
              }
            : pmo
        )
      );
      alert('Semana Operativa excluída com sucesso!');
    } catch (error: any) {
      alert(error.message || 'Erro ao excluir a Semana Operativa.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeletePmo = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este PMO?')) return;

    setLoading(true);
    setBackendMessage(null);

    try {
      const dados = dadosPmo[id];
      if (!dados) throw new Error('Dados para exclusão não encontrados.');

      console.log("Payload enviado para exclusão:", dados);

      await excluirPmo(dados);

      setPmos((prevPmos) => prevPmos.filter((pmo) => pmo.id !== id));
      setDadosPmo((prevDados) => {
        const { [id]: _, ...rest } = prevDados;
        return rest;
      });
    } catch (error: any) {
      console.error("Erro ao excluir PMO:", error);
      if (error.message) setBackendMessage(error.message);
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
                          <Button
                            className="ml-2 open-study-button"
                            variant="info"
                            onClick={() =>
                              handleAbrirEstudo(
                                pmo.id,
                                semana.idSemanaOperativa,
                                dadosPmo[pmo.id]?.versaoPMO || ''
                              )
                            }
                          >
                            Abrir Estudo
                          </Button>
                          <Button
                            className="ml-2 delete-week-button"
                            variant="danger"
                            onClick={() => handleExcluirSemana(pmo.id, semana.idSemanaOperativa)}
                          >
                            Excluir Semana
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
  
      {/* Modal de Abertura de Estudo */}
      <EstudoModal
  show={showModal}
  onHide={() => setShowModal(false)}
  onConfirm={(estudoId, isPadrao) => {
    setShowModal(false);
    console.log('Confirmado:', { estudoId, isPadrao });
    if (dadosEstudo) {
      abrirEstudo({
        ...dadosEstudo,
        idSemanaOperativa: isPadrao ? null : estudoId,
      })
        .then(() => alert('Estudo aberto com sucesso!'))
        .catch((error) => alert('Erro ao abrir o estudo: ' + error.message));
    }
  }}
  estudos={estudosDisponiveis} // Certifique-se de que está passando a lista aqui
/>



    </div>
  );
  
};

export default PmoList;
