export interface EstudoModalProps {
    show: boolean; // Controla a exibição do modal
    onHide: () => void; // Função para fechar o modal
    onConfirm: (estudoId: number | null, isPadrao: boolean) => void; // Função chamada ao confirmar
    estudos: Array<{ id: number; nome: string }>; // Lista de estudos para o select
  }
  