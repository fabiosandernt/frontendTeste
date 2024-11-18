export interface PmoDto {
  idPmo: number;
  anoReferencia: number;
  mesReferencia: number;
  qtdMesesadiante?: number;
  tbSemanaoperativas: SemanaOperativaDto[];
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
