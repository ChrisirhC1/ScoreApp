import React, { useState } from 'react';
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
// import usePlayers from '../../../hooks/usePlayers';

import { usePlayers } from '../../../context/PlayerContext';

const ModalConfirmReset = ({ show, setShow }) => {

    const { resetScores, clearPlayers } = usePlayers();
    const [NoMessage, setNoMessage] = useState(1);
    const [resetScoresMessage] = useState({
        title: 'Réinitialisation',
        message: 'Voulez-vous vraiment réinitialiser la partie ?'
    });
    const [deletePlayerMessage] = useState({
        title: 'Même joueurs ?',
        message: 'Voulez-vous garder les mêmes joueurs ?'
    });

    const handleConfirm = () => {
        setNoMessage(2);
    };


    const handleClose = () => {
        setNoMessage(1);
        setShow(!show);
    };

    return (
        <Modal show={show} onHide={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{resetScoresMessage.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {resetScoresMessage.message}
            </Modal.Body>
            <Modal.Footer>

                <Button variant="secondary" onClick={() => handleClose()} hidden={NoMessage === 2}>
                    Annuler
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Confirmer
                </Button>
            </Modal.Footer>


            {NoMessage === 2 && (
                <>
                    <Modal.Header >
                        <Modal.Title>{deletePlayerMessage.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {deletePlayerMessage.message}
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="danger" onClick={() => { handleClose(), clearPlayers() }} >
                            <OverlayTrigger
                                placement="top"  
                                overlay={<Tooltip id="tooltip-non">{"(Libère la mémoire)"}</Tooltip>}
                            >
                                <span>Non</span>
                            </OverlayTrigger>
                        </Button>

                        <Button variant="success" onClick={() => { handleClose(), resetScores() }}>
                            Oui
                        </Button>
                    </Modal.Footer>
                </>
            )}


        </Modal>
    );
}

export default ModalConfirmReset;