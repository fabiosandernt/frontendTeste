import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, Input, Space, Row, Col } from 'antd'; // Importando componentes do Ant Design
import { fetchInsumos } from '../../services/InsumoService'; // Função para buscar insumos
import { InsumoDto } from '../../models/InsumoDto'; // Modelo do DTO

const InsumosList: React.FC = () => {
  const [insumos, setInsumos] = useState<InsumoDto[]>([]); // Lista de insumos
  const [loading, setLoading] = useState(false); // Estado de loading
  const [filters, setFilters] = useState({
    NomInsumopmo: '',
    SglInsumo: '',
    TipInsumopmo: '',
    Limit: 10, // Limite por página
    Offset: 0, // Página inicial
    Sort: '',
  });
  const [totalCount, setTotalCount] = useState(0); // Total de itens retornados pela API
  const [currentPage, setCurrentPage] = useState(1); // Página atual

  // Função para buscar os insumos filtrados
  const fetchFilteredInsumos = () => {
    setLoading(true);
    fetchInsumos(filters).then(data => {
      setInsumos(data); // Atualiza a lista de insumos com os dados
      setTotalCount(100); // Definir um valor fictício (ou ajustar baseado nos dados)
      setLoading(false);
    }).catch(error => {
      console.error("Erro ao buscar insumos:", error);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchFilteredInsumos(); // Buscar os insumos ao carregar o componente
  }, [filters]); // Dependências para buscar novamente ao mudar os filtros

  // Função para editar um insumo
  const handleEdit = (id: number) => {
    console.log(`Editar insumo com ID: ${id}`);
    // Aqui você pode redirecionar ou abrir um modal de edição
  };

  // Função para excluir um insumo
  const handleDelete = (id: number) => {
    console.log(`Excluir insumo com ID: ${id}`);
    // Aqui você pode chamar a função para remover o item
  };

  // Função para atualizar os filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  // Função para mudar a página na paginação
  const handlePageChange = (newPage: number) => {
    const newOffset = (newPage - 1) * filters.Limit; // Calcular o offset com base na nova página
    setFilters(prevFilters => ({ ...prevFilters, Offset: newOffset }));
    setCurrentPage(newPage); // Atualizar a página atual
  };

  // Definição das colunas para a tabela Ant Design
  const columns = [
    { title: 'Ordem', dataIndex: 'numOrdemexibicao', key: 'numOrdemexibicao' },
    { title: 'Tipo', dataIndex: 'tipInsumopmo', key: 'tipInsumopmo', render: (text: string) => (text === 'E' ? 'Estruturado' : 'Não Estruturado') },
    { title: 'Nome', dataIndex: 'nomInsumopmo', key: 'nomInsumopmo' },
    { title: 'Sigla', dataIndex: 'sglInsumo', key: 'sglInsumo' },
    { title: 'Exportar', dataIndex: 'flgExportainsumo', key: 'flgExportainsumo', render: (flag: boolean) => (flag ? 'Sim' : 'Não') },
    { title: 'Pré-aprovado', dataIndex: 'flgPreaprovado', key: 'flgPreaprovado', render: (flag: boolean) => (flag ? 'Sim' : 'Não') },
    { title: 'Ativo', dataIndex: 'flgAtivo', key: 'flgAtivo', render: (flag: boolean) => (flag ? 'Sim' : 'Não') },
    {
      title: 'Ações',
      key: 'actions',
      render: (text: any, record: InsumoDto) => (
        <Space size="middle">
          {/* <Button type="primary" onClick={() => handleEdit(record.idInsumopmo)}>Editar</Button>
          <Button type="primary" danger onClick={() => handleDelete(record.idInsumopmo)}>Excluir</Button> */}
        <Space size="middle">
  <Button
    color="primary"
    variant="solid"
    size="small"
    onClick={() => handleEdit(record.idInsumopmo)}
  >
    Editar
  </Button>
  <Button
    color="danger"
    variant="solid"
    size="small"
    onClick={() => handleDelete(record.idInsumopmo)}
  >
    Excluir
  </Button>
</Space>

        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Filtros */}
      <Row gutter={[16, 16]} justify="center">
        <Col span={6}>
          <Input
            placeholder="Nome"
            name="NomInsumopmo"
            value={filters.NomInsumopmo}
            onChange={handleFilterChange}
          />
        </Col>
        <Col span={6}>
          <Input
            placeholder="Sigla"
            name="SglInsumo"
            value={filters.SglInsumo}
            onChange={handleFilterChange}
          />
        </Col>
        <Col span={6}>
          <Input
            placeholder="Tipo"
            name="TipInsumopmo"
            value={filters.TipInsumopmo}
            onChange={handleFilterChange}
          />
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={fetchFilteredInsumos}>Buscar</Button>
        </Col>
      </Row>

      {/* Tabela */}
      <Table
        dataSource={insumos}
        columns={columns}
        rowKey="idInsumopmo"
        loading={loading}
        pagination={false}  // Desativamos a paginação padrão
        style={{ marginTop: '20px' }}
      />

      {/* Paginação */}
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={filters.Limit}
          onChange={handlePageChange}
        />
      </Row>
    </div>
  );
};

export default InsumosList;
