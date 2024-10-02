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
