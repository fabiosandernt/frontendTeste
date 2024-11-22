import api from '../api/api';
import { DadosPmoDto, PmoDto, PmoFilter } from '../models/PmoDto';


// Função para buscar PMOs com filtros
export const fetchPmos = async (filter: PmoFilter = {}): Promise<PmoDto[]> => {
  try {
    console.log('Chamando API com filtros:', filter);
    const response = await api.get<PmoDto | PmoDto[]>('/PMO/filter', { params: filter });
    const data = response.data;

    // Verifica se o retorno é um único objeto ou uma lista
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Erro ao buscar PMOs:', error);
    throw error;
  }
};

// Função para buscar um PMO pelo ID
export const fetchPmoById = async (id: number): Promise<PmoDto> => {
  try {
    const response = await api.get<PmoDto>(`/PMO/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar PMO por ID:', error);
    throw error;
  }
};

// Função para atualizar um PMO existente
export const updatePmo = async (pmo: PmoDto): Promise<void> => {
  try {
    await api.put(`/PMO/Editar/${pmo.idPmo}`, pmo);
  } catch (error) {
    console.error('Erro ao atualizar o PMO:', error);
    throw error;
  }
};

export const alterarSemanaOperativa = async (dados: {
  Id: number;
  DataReuniao: string;
  DataInicioManutencao: string;
  DataFimManutencao: string;
}): Promise<void> => {
  try {
    await api.post('/PMO/AlterarSemanaOperativa', dados);
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errors) {
      // Retorna os erros detalhados
      throw error.response.data.errors;
    }
    throw new Error('Erro desconhecido ao alterar a semana operativa');
  }
};

// Função para incluir um novo PMO
export const incluirPmo = async (anoReferencia: number, mesReferencia: number): Promise<void> => {
  try {
    const payload = {
      anoReferencia,
      mesReferencia,
    };
    await api.post('/PMO/IncluirPMO', payload);
  } catch (error: any) {
    if (error.response && error.response.data) {
      const responseData = error.response.data;

      // Captura a mensagem em `errors` (se for uma lista) ou `message`
      if (responseData.errors && Array.isArray(responseData.errors)) {
        throw responseData.errors[0]; // Retorna a primeira mensagem
      }

      if (responseData.message) {
        throw responseData.message; // Retorna uma mensagem única
      }
    }

    // Lança o erro completo caso o formato do backend seja inesperado
    throw error.response?.data || error; // Isso garante que sempre algo será exibido
  }
};








// Função para excluir um PMO
export const excluirPmo = async (payload: DadosPmoDto): Promise<void> => {
  try {
    const data = {
      idPMO: payload.idPMO,
      versaoPMO: btoa(String.fromCharCode(...Array.from(payload.versaoPMO))), // Ajuste para compatibilidade
    };
    await api.request({
      method: 'DELETE',
      url: '/PMO/ExcluirPMO',
      data,
    });
  } catch (error: any) {
    console.error('Erro ao excluir PMO:', error);
    throw error.response?.data?.message || 'Erro desconhecido ao excluir o PMO.';
  }
};



