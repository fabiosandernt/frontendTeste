export interface EscolhaGabaritoModel {
  idSemanaOperativa: number;
  idEstudo?: number | null; // Opcional, semelhante ao `int?` no C#
  estudos: SelectListItem[]; // Lista de estudos disponíveis
  estudosParaDesconsiderar: SelectListItem[]; // Lista de estudos a desconsiderar
  isPadrao: boolean; // Se é padrão ou não
  versao: Uint8Array; // Versão (equivalente a byte[])
  versaoPMO: Uint8Array; // Versão do PMO
  versaoSemanaOperativa: Uint8Array; // Versão da Semana Operativa
}

export interface SelectListItem {
  value: string | number; // Valor do item
  text: string; // Texto exibido no item
}
