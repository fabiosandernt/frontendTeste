export interface AberturaEstudoModel {
    idPMO: number; // Identificador do PMO (obrigatório)
    idSemanaOperativa?: number | null; // Identificador opcional da semana operativa
    versaoPmoString: string; // String representando a versão do PMO
  }
  