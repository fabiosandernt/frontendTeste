import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export interface EstudoModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: (estudoId: number | null, isPadrao: boolean) => void;
  estudos: Array<{ id: number; nome: string }>;
}

const EstudoModal: React.FC<EstudoModalProps> = ({ show, onHide, onConfirm, estudos }) => {
  const [selectedEstudo, setSelectedEstudo] = useState<number | null>(null);
  const [isPadrao, setIsPadrao] = useState(true);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Abertura de Estudo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <input
            type="radio"
            id="padrao"
            name="isPadrao"
            checked={isPadrao}
            onChange={() => setIsPadrao(true)}
          />
          <label htmlFor="padrao">Padrão</label>
        </div>
        <div>
          <input
            type="radio"
            id="estudo"
            name="isPadrao"
            checked={!isPadrao}
            onChange={() => setIsPadrao(false)}
          />
          <label htmlFor="estudo">Estudo:</label>
          <select
            disabled={isPadrao}
            value={selectedEstudo || ''}
            onChange={(e) => setSelectedEstudo(Number(e.target.value))}
          >
            <option value="" disabled>
              Selecione um estudo
            </option>
            {estudos.map((estudo) => (
              <option key={estudo.id} value={estudo.id}>
                {estudo.nome}
              </option>
            ))}
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={() => onConfirm(selectedEstudo, isPadrao)}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EstudoModal;
