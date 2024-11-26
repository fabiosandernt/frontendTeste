export interface PmoDto {
  idPmo: number;
  anoReferencia: number;
  mesReferencia: number;
  qtdMesesadiante?: number;
  verControleconcorrencia: string; // Base64 do controle de concorrência
  tbSemanaoperativas: SemanaOperativaDto[];
}
// Novo DTO para uso paralelo ao PMOManterModel
export interface PMOManterModel {
  id: number; // Identificador único
  semanasOperativas: SemanaOperativaModel[]; // Lista de semanas operativas
  mesReferencia: number; // Mês de referência
  anoReferencia: number; // Ano de referência
  quantidadeMesesAdiante?: number; // Meses à frente para estudo (opcional)
  versao: Uint8Array; // Controle de concorrência em formato binário
  versaoPmoString: string; // Versão do PMO em formato string
  nomeMesReferencia: string; // Nome do mês de referência
}
export interface SemanaOperativaModel {
  idSemanaOperativa: number; // Identificador único da semana operativa
  nomeSemanaOperativa: string; // Nome da semana operativa
  dataInicioSemana: string; // Data de início da semana
  dataFimSemana: string; // Data de término da semana
  dataReuniao: string; // Data da reunião
  dataInicioManutencao: string; // Data de início da manutenção
  dataFimManutencao: string; // Data de fim da manutenção
  numeroRevisao?: number; // Número da revisão (opcional)
}
export interface PmoFilter {
  anoReferencia?: number;
  mesReferencia?: number;
  qtdMesesadiante?: number;
  limit?: number;
  offset?: number;
  sort?: string;
}

export interface SemanaOperativaDto {
  idSemanaoperativa: number;
  nomSemanaoperativa: string;
  datIniciosemana: string;
  datFimsemana: string;
  datReuniao: string;
  datIniciomanutencao: string;
  datFimmanutencao: string;
  numRevisao?: number;
}

export interface DadosPmoDto {
  idPMO: number;
  versaoPMO: Uint8Array; // Representação do controle de concorrência em formato Uint8Array
}
