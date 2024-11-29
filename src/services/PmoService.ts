import api from '../api/api';
import { ManutencaoSemanaOperativaModel } from '../models/ManutencaoSemanaOperativaModel';
import { DadosPmoDto, PmoDto, PmoFilter, PMOManterModel } from '../models/PmoDto';
import { AberturaEstudoModel } from '../models/AberturaEstudoModel';
import { EscolhaGabaritoModel } from '../models/EscolhaGabaritoModel';
// Função para buscar PMOs com filtros
export const fetchPmos = async (filter: PmoFilter = {}): Promise<PMOManterModel[]> => {
  try {
    console.log('Chamando API com filtros:', filter);

    // Faz a chamada à API com os parâmetros do filtro
    const response = await api.get<PMOManterModel | PMOManterModel[]>('/PMO/Pesquisa', { params: filter });
    const data = response.data;

    // Retorna os dados convertidos para uma lista
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Erro ao buscar PMOManterModels:', error);
    throw error;
  }
};

//Função para Abrir um Estudo



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
  IdPMO: number;
  DataReuniao: string;
  DataInicioManutencao: string;
  DataFimManutencao: string;
}): Promise<void> => {
  try {
    await api.put('/PMO/AlterarSemana', dados);
  } catch (error: any) {
    if (error.response && error.response.data) {
      const responseData = error.response.data;

      // Verifica se há mensagens de erro específicas no formato esperado
      if (responseData.errors && Array.isArray(responseData.errors)) {
        throw new Error(responseData.errors.join(', ')); // Concatena mensagens de erro em uma string
      }

      if (responseData.message) {
        throw new Error(responseData.message); // Lança a mensagem como erro
      }
    }

    // Caso o formato do erro seja inesperado, lança uma mensagem genérica
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
      versaoPMO: payload.versaoPMO, // Ajuste para compatibilidade
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



 export const excluirSemanaOperativa = async (payload: ManutencaoSemanaOperativaModel): Promise<void> => {
   const data = {
     idSemanaOperativa: payload.IdSemanaOperativa, 
      idPMO: payload.IdPMO, 
      versaoPmoString: payload.VersaoPmoString,
   };

   await api.post('/PMO/ExcluirSemanaOperativa', data);
 };


 export const carregarAbrirEstudo = async (estudo: AberturaEstudoModel): Promise<EscolhaGabaritoModel> => {
  try {
    const response = await api.post<EscolhaGabaritoModel>('/PMO/CarregarAbrirEstudo', estudo);
    return response.data; 
  } catch (error: any) {
    console.error('Erro ao carregar os dados para abrir o estudo:', error);
    throw error.response?.data?.message || 'Erro desconhecido ao carregar os dados do estudo.';
  }
};

export const abrirEstudo = async (dados: AberturaEstudoModel): Promise<void> => {
  try {    
    await api.post('/PMO/AbrirEstudo', dados);
    console.log('Estudo aberto com sucesso.');
  } catch (error: any) {
    console.error('Erro ao abrir o estudo:', error);
    throw error.response?.data?.message || 'Erro desconhecido ao abrir o estudo.';
  }
};

// Função para buscar os estudos disponíveis
export const fetchEstudos = async (): Promise<{ descricao: string; chave: number }[]> => {
  try {
    const response = await api.get<{ descricao: string; chave: number }[]>('/Estudo/ConsultarEstudo');
    return response.data; // Retorna a lista de estudos
  } catch (error: any) {
    console.error('Erro ao buscar estudos:', error);
    throw error.response?.data?.message || 'Erro desconhecido ao buscar os estudos.';
  }
};
