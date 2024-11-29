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

  const handleConfirm = () => {
    onConfirm(isPadrao ? null : selectedEstudo, isPadrao);
  };

  const isConfirmDisabled = !isPadrao && selectedEstudo === null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Abertura de Estudo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Check
              type="radio"
              id="padrao"
              label="Padrão"
              name="isPadrao"
              checked={isPadrao}
              onChange={() => setIsPadrao(true)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="radio"
              id="estudo"
              label="Estudo"
              name="isPadrao"
              checked={!isPadrao}
              onChange={() => setIsPadrao(false)}
            />
            <Form.Control
              as="select"
              disabled={isPadrao}
              value={selectedEstudo || ''}
              onChange={(e) => setSelectedEstudo(Number(e.target.value))}
              className="mt-2"
            >
              <option value="" disabled>
                Selecione um estudo
              </option>
              {estudos.map((estudo) => (
                <option key={estudo.id} value={estudo.id}>
                  {estudo.nome}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        {!isPadrao && selectedEstudo === null && (
          <p className="text-danger mt-2">Selecione um estudo para continuar.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={isConfirmDisabled}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EstudoModal;
