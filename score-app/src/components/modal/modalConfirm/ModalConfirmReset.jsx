import { useState } from 'react';
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { usePlayers } from '../../../context/PlayerContext';

const STEP_CONFIRM = 1;
const STEP_KEEP_PLAYERS = 2;

const ModalConfirmReset = ({ show, setShow }) => {
  const { resetScores, clearPlayers } = usePlayers();
  const [step, setStep] = useState(STEP_CONFIRM);

  const handleClose = () => {
    setStep(STEP_CONFIRM);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Réinitialisation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Voulez-vous vraiment réinitialiser la partie ?
      </Modal.Body>
      <Modal.Footer>
        {step === STEP_CONFIRM && (
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
        )}
        <Button variant="danger" onClick={() => setStep(STEP_KEEP_PLAYERS)}>
          Confirmer
        </Button>
      </Modal.Footer>

      {step === STEP_KEEP_PLAYERS && (
        <>
          <Modal.Header>
            <Modal.Title>Même joueurs ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Voulez-vous garder les mêmes joueurs ?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => { handleClose(); clearPlayers(); }}
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-non">Libère la mémoire</Tooltip>}
              >
                <span>Non</span>
              </OverlayTrigger>
            </Button>
            <Button variant="success" onClick={() => { handleClose(); resetScores(); }}>
              Oui
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ModalConfirmReset;
