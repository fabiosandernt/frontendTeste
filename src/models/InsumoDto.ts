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
}
