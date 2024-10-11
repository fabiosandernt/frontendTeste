export interface InsumoDto {
  idInsumopmo: number;
  tipInsumopmo: string;
  nomInsumopmo: string;
  numOrdemexibicao: number;
  flgPreaprovado: boolean;
  flgExportainsumo: boolean;
  sglInsumo: string;
  flgAtivo: boolean;
  dinUltimaalteracao?: Date; // Pode ser opcional

  // Novos campos para a edição do insumo
  estagio?: boolean;
  patamar?: boolean;
  limite?: boolean;
  preAprovadoComAlteracao?: boolean;
  
  aceitaValorNegativo?: boolean;
  recuperaValorAnterior?: boolean;
  destacaDiferenca?: boolean;
  comportamentoObrigatorio?: boolean;
  
  qtdDigitos?: number;
  qtdDecimais?: number;
}
