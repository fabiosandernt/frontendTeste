export interface PmoFilter {
    anoReferencia?: number; // Filtro opcional para o ano de referência
    mesReferencia?: number; // Filtro opcional para o mês de referência
    limit?: number;         // Limite de resultados por página
    offset?: number;        // Deslocamento para paginação
    sort?: string;          // Ordenação (ex.: "anoReferencia asc")
  }