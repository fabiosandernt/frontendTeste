import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { alterarSemanaOperativa } from '../../services/PmoService';

const SemanaOperativaEdit: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const [semana, setSemana] = useState<{
    idSemanaOperativa: number;
    dataReuniao: string;
    dataInicioManutencao: string;
    dataFimManutencao: string;
  } | null>(() => {
    if (state && state.semana) {
      const { idSemanaOperativa, dataReuniao, dataInicioManutencao, dataFimManutencao } = state.semana;
      return {
        idSemanaOperativa,
        dataReuniao: formatDate(dataReuniao),
        dataInicioManutencao: formatDate(dataInicioManutencao),
        dataFimManutencao: formatDate(dataFimManutencao),
      };
    }
    return null;
  });

  const [errors, setErrors] = useState<string[]>([]); // Lista de erros

  if (!semana) {
    console.error('Nenhuma semana operativa foi passada para edição.');
    navigate('/pmo');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSemana((prevSemana) => (prevSemana ? { ...prevSemana, [name]: value } : null));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]); // Limpa mensagens de erro anteriores
    if (semana) {
      const dadosAlteracao = {
        Id: semana.idSemanaOperativa,
        DataReuniao: semana.dataReuniao,
        DataInicioManutencao: semana.dataInicioManutencao,
        DataFimManutencao: semana.dataFimManutencao,
      };

      try {
        console.log('Enviando dados para o backend:', dadosAlteracao);
        await alterarSemanaOperativa(dadosAlteracao);
        console.log('Semana operativa alterada com sucesso!');
        navigate('/pmo');
      } catch (error: any) {
        console.error('Erro ao alterar a semana operativa:', error);
        if (Array.isArray(error)) {
          // Define os erros recebidos
          setErrors(error);
        } else {
          setErrors(['Erro desconhecido ao alterar a semana operativa']);
        }
      }
    }
  };

  return (
    <Container>
      <h1>Editar Semana Operativa</h1>
      {errors.length > 0 && (
        <Alert variant="danger">
          <ul>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}
      <Form onSubmit={handleSave}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={semana.idSemanaOperativa}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formDatReuniao">
              <Form.Label>Data da Reunião</Form.Label>
              <Form.Control
                type="date"
                name="datReuniao"
                value={semana.dataReuniao}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formDatInicioManutencao">
              <Form.Label>Início da Manutenção</Form.Label>
              <Form.Control
                type="date"
                name="datIniciomanutencao"
                value={semana.dataInicioManutencao}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDatFimManutencao">
              <Form.Label>Término da Manutenção</Form.Label>
              <Form.Control
                type="date"
                name="datFimmanutencao"
                value={semana.dataFimManutencao}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Confirmar
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/pmo')}
          className="mt-3 ml-2"
        >
          Cancelar
        </Button>
      </Form>
    </Container>
  );
};

export default SemanaOperativaEdit;
