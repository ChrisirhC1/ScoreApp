import { Button, Col, Row, Modal, Table } from 'react-bootstrap';
import { useState } from 'react';
import { deleteLocalStorage, getWinner, updateScoresToZero } from '../../data/LocalStorageData';
import './footer.css';

const Footer = () => {
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const [scores, setScores] = useState([]);

    const handleShowModal = () => {
        const scoresData = getWinner();
        setScores(scoresData);
        setShowModal(true);
    };


    const handleCloseModal = () => setShowModal(false);
    const handleShowConfirmDialog = () => setShowConfirmDialog(true);
    const handleCloseConfirmDialog = () => setShowConfirmDialog(false);

    const getMedalClass = (index) => {
        if (index === 0) return 'text-gold'; // Gold
        if (index === 1) return 'text-silver'; // Silver
        if (index === 2) return 'text-bronze'; // Bronze
        return '';
    };

    const handleNewGame = (samePlayers) => {
        if (samePlayers) {
            updateScoresToZero();
        } else {
            deleteLocalStorage();
        }
        handleCloseConfirmDialog();
        handleCloseModal();
        window.location.reload();
    };

    return (
        <>
            <Row className="mt-4">
                <Col className="text-center">
                    <Button variant="success" onClick={handleShowModal}>Terminer la manche</Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header >
                    <Modal.Title>Classement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {scores.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Score Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores.map(([name, score], index) => (
                                    <tr key={name} className={getMedalClass(index)}>
                                        <td>{name}</td>
                                        <td>{score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>Aucun gagnant trouvé.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fermer
                    </Button>

                    <Button variant="primary" onClick={handleShowConfirmDialog} >
                        Nouvelle partie

                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de confirmation */}
            <Modal show={showConfirmDialog} onHide={handleCloseConfirmDialog} centered /* le fond est noir */ >
                <Modal.Header >
                    <Modal.Title>Nouvelle Partie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Voulez-vous continuer avec les mêmes joueurs ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleNewGame(false)}>Non</Button>
                    <Button variant="primary" onClick={() => handleNewGame(true)}>Oui</Button>
                    <Button variant="danger" onClick={handleCloseConfirmDialog}>Annuler</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Footer;