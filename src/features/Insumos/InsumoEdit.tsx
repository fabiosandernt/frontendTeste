import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchInsumoById, updateInsumo } from '../../services/InsumoService'; 
import { InsumoDto } from '../../models/InsumoDto';

const InsumoEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const [insumo, setInsumo] = useState<InsumoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Para redirecionar após salvar

  useEffect(() => {
    // Busca o insumo pelo ID quando o componente monta
    if (id) {
      fetchInsumoById(parseInt(id))
        .then((data) => {
          setInsumo(data);
          setLoading(false);
        })
        .catch((error: unknown) => {
          console.error('Erro ao buscar o insumo:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInsumo((prevInsumo) => prevInsumo ? { ...prevInsumo, [name]: value } : null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setInsumo((prevInsumo) => prevInsumo ? { ...prevInsumo, [name]: checked } : null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (insumo) {
      await updateInsumo(insumo)
        .then(() => {
          navigate('/insumos');
        })
        .catch((error: unknown) => {
          console.error('Erro ao atualizar o insumo:', error);
        });
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!insumo) {
    return <div>Insumo não encontrado</div>;
  }

  return (
    <Container>
      <h1>Editar Insumo</h1>
      <Form onSubmit={handleSave}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nomInsumopmo"
                value={insumo.nomInsumopmo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formOrdem">
              <Form.Label>Ordem de Exibição</Form.Label>
              <Form.Control
                type="number"
                name="numOrdemexibicao"
                value={insumo.numOrdemexibicao}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h4>Forma de Coleta</h4>
        <Row>
          <Col>
            <Form.Check 
              type="checkbox" 
              label="Estágio" 
              name="estagio" 
              checked={!!insumo.estagio} 
              onChange={handleCheckboxChange} 
            />
            <Form.Check 
              type="checkbox" 
              label="Patamar" 
              name="patamar" 
              checked={!!insumo.patamar} 
              onChange={handleCheckboxChange} 
            />
            <Form.Check 
              type="checkbox" 
              label="Limite" 
              name="limite" 
              checked={!!insumo.limite} 
              onChange={handleCheckboxChange} 
            />
            <Form.Check 
              type="checkbox" 
              label="Pré-aprovado com alteração" 
              name="preAprovadoComAlteracao" 
              checked={!!insumo.preAprovadoComAlteracao} 
              onChange={handleCheckboxChange} 
            />
          </Col>
        </Row>

        <h4>Comportamento</h4>
        <Row>
          <Col>
            <Form.Check 
              type="checkbox" 
              label="Aceita valor negativo" 
              name="aceitaValorNegativo" 
              checked={!!insumo.aceitaValorNegativo} 
              onChange={handleCheckboxChange} 
            />
            <Form.Check 
              type="checkbox" 
              label="Recupera valor anterior" 
              name="recuperaValorAnterior" 
              checked={!!insumo.recuperaValorAnterior} 
              onChange={handleCheckboxChange} 
            />
            <Form.Check 
              type="checkbox" 
              label="Destaca diferença" 
              name="destacaDiferenca" 
              checked={!!insumo.destacaDiferenca} 
              onChange={handleCheckboxChange} 
            />
            <Form.Check 
              type="checkbox" 
              label="Comportamento obrigatório" 
              name="comportamentoObrigatorio" 
              checked={!!insumo.comportamentoObrigatorio} 
              onChange={handleCheckboxChange} 
            />
          </Col>
        </Row>

        <h4>Tipo de Dados</h4>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formQtdDigitos">
              <Form.Label>Qtd Dígitos</Form.Label>
              <Form.Control
                type="number"
                name="qtdDigitos"
                value={insumo.qtdDigitos ?? ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formQtdDecimais">
              <Form.Label>Qtd Decimais</Form.Label>
              <Form.Control
                type="number"
                name="qtdDecimais"
                value={insumo.qtdDecimais ?? ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h4>Status</h4>
        <Row>
          <Col>
            <Form.Check 
              type="radio" 
              label="Ativo" 
              name="flgAtivo" 
              value="true" 
              checked={insumo.flgAtivo === true} 
              onChange={() => setInsumo(prev => prev ? { ...prev, flgAtivo: true } : prev)} 
            />
            <Form.Check 
              type="radio" 
              label="Inativo" 
              name="flgAtivo" 
              value="false" 
              checked={insumo.flgAtivo === false} 
              onChange={() => setInsumo(prev => prev ? { ...prev, flgAtivo: false } : prev)} 
            />
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-3">
          Confirmar
        </Button>
        <Button variant="secondary" onClick={() => navigate('/insumos')} className="mt-3 ml-2">
          Cancelar
        </Button>
      </Form>
    </Container>
  );
};

export default InsumoEdit;
