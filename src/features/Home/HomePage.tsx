import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import './HomePage.css';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Dados para Volumes Iniciais dos Reservatórios
const volumeReservatoriosData = {
  labels: ['Reservatório A', 'Reservatório B', 'Reservatório C', 'Reservatório D', 'Reservatório E'],
  datasets: [
    {
      label: 'Volume Inicial (%)',
      data: [80, 45, 90, 70, 55],
      backgroundColor: ['#36a2eb', '#ff6384', '#4bc0c0', '#ffce56', '#9966ff'],
    },
  ],
};

// Dados para Cronograma de Manutenção das Usinas Hidroelétricas
const manutencaoHidreletricaData = {
  labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
  datasets: [
    {
      label: 'Horas de Manutenção',
      data: [8, 20, 15, 25, 10],
      borderColor: '#36a2eb',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true,
    },
  ],
};

// Dados para Cronograma de Manutenção das Usinas Térmicas
const manutencaoTermicaData = {
  labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
  datasets: [
    {
      label: 'Horas de Manutenção',
      data: [12, 18, 22, 14, 20],
      borderColor: '#ff6384',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
    },
  ],
};

// Dados para Disponibilidade, Inflexibilidade e Custo das Usinas Térmicas
const disponibilidadeTermicasData = {
  labels: ['Patamar Pesado', 'Patamar Médio', 'Patamar Leve', 'Patamar Crítico'],
  datasets: [
    {
      label: 'Disponibilidade (MWmed)',
      data: [180, 150, 110, 75],
      backgroundColor: ['#4bc0c0', '#ffce56', '#36a2eb', '#ff6384'],
    },
    {
      label: 'Inflexibilidade (MWmed)',
      data: [50, 40, 30, 20],
      backgroundColor: ['#9966ff', '#c9cbcf', '#f7464a', '#46bfbd'],
    },
  ],
};

const HomePage: React.FC = () => {
  return (
    <Container className="mt-4">
      <h1>Dashboard</h1>
      <p>Monitoramento de dados do Programa Mensal de Operação (PMO).</p>

      {/* Gráficos */}
      <Row>
        <Col md={6}>
          <div className="chart-container">
            <h3>Volumes Iniciais dos Reservatórios</h3>
            <Bar data={volumeReservatoriosData} />
          </div>
        </Col>
        <Col md={6}>
          <div className="chart-container">
            <h3>Cronograma de Manutenção - Hidrelétricas</h3>
            <Line data={manutencaoHidreletricaData} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <div className="chart-container">
            <h3>Cronograma de Manutenção - Térmicas</h3>
            <Line data={manutencaoTermicaData} />
          </div>
        </Col>
        <Col md={6}>
          <div className="chart-container">
            <h3>Disponibilidade e Inflexibilidade - Térmicas</h3>
            <Bar data={disponibilidadeTermicasData} />
          </div>
        </Col>
      </Row>

      {/* Tabela Mockada */}
      <Row>
        <Col>
          <div className="table-container">
            <h3>Resumo Geral</h3>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Indicador</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Reservatórios com Volume Acima de 80%</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Horas de Manutenção Hidrelétrica (Semana 2)</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>Horas de Manutenção Térmica (Semana 3)</td>
                  <td>22</td>
                </tr>
                <tr>
                  <td>Disponibilidade Total das Térmicas (MWmed)</td>
                  <td>515</td>
                </tr>
                <tr>
                  <td>Inflexibilidade Total das Térmicas (MWmed)</td>
                  <td>140</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
