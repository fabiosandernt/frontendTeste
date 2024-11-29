import api from '../api/api';

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
  