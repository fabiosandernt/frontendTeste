import api from '../api/api';
import { VisualizarInsumoModel } from '../models/VisualizarInsumoModel';

// Tipagem para os parâmetros de filtro
interface InsumoFilter {
  NomInsumopmo?: string;
  SglInsumo?: string;
  TipInsumopmo?: string;
  Limit?: number;
  Offset?: number;
  Sort?: string;
}

export const fetchInsumos = async (filter: InsumoFilter = {}): Promise<VisualizarInsumoModel[]> => {
  console.log("Parâmetros enviados para API:", filter); // Adicione logs para depurar
  try {
    const response = await api.get<VisualizarInsumoModel[]>('/Insumo/filter', {
      params: filter, // Certifique-se de que a estrutura dos parâmetros corresponde à esperada pela API
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar insumos:", error);
    throw error;
  }
};


// Função para buscar insumo por ID
export const fetchInsumoById = async (id: number): Promise<VisualizarInsumoModel> => {
  const response = await api.get<VisualizarInsumoModel>(`/Insumos/${id}`);
  return response.data;
};
// Função para atualizar um insumo existente
export const updateInsumo = async (insumo: VisualizarInsumoModel): Promise<void> => {
  try {
    // Usando a rota correta 'Insumos/Editar'
    await api.put(`/Insumos/Editar/${insumo.id}`, insumo);
  } catch (error) {
    console.error('Erro ao atualizar o insumo:', error);
    throw error;
  }
};
