export interface VisualizarInsumoModel {
    id: number;
    nome: string;
    ordemExibicao?: number; // `short?` em C# equivale a `number?` em TypeScript
    preAprovado: string;
    reservado: string;
    tipoInsumo: string;
    siglaInsumo: string;
    exportarInsumo: string;
    ativo: string;
  }