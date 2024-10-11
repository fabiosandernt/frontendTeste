import api from '../api/api';
import { InsumoDto } from '../models/InsumoDto';

// Tipagem para os parâmetros de filtro
interface InsumoFilter {
  NomInsumopmo?: string;
  SglInsumo?: string;
  TipInsumopmo?: string;
  Limit?: number;
  Offset?: number;
  Sort?: string;
}

// Função para buscar insumos com filtro
export const fetchInsumos = async (filter: InsumoFilter = {}): Promise<InsumoDto[]> => {
  const response = await api.get<InsumoDto[]>('/Insumo/filter', { params: filter });
  return response.data;
};

// Função para buscar insumo por ID
export const fetchInsumoById = async (id: number): Promise<InsumoDto> => {
  const response = await api.get<InsumoDto>(`/Insumos/${id}`);
  return response.data;
};
// Função para atualizar um insumo existente
export const updateInsumo = async (insumo: InsumoDto): Promise<void> => {
  try {
    // Usando a rota correta 'Insumos/Editar'
    await api.put(`/Insumos/Editar/${insumo.idInsumopmo}`, insumo);
  } catch (error) {
    console.error('Erro ao atualizar o insumo:', error);
    throw error;
  }
};
