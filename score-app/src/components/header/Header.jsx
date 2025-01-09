import { Button, Col, Row, Collapse } from "react-bootstrap";
import './header.css';
import { useState } from "react";
import ModalPlayerSetup from "../modal/modalPlayerSetup/ModalPlayerSetup";
import ModalConfirmReset from "../modal/modalConfirm/ModalConfirmReset";
import Confetti from "../confetti/Confetti";
import ModalOptions from "../modal/modalOptions/ModalOptions";

const Header = () => {
    const [showPlayerSetup, setShowPlayerSetup] = useState(false);
    const [showParams, setShowParams] = useState(false);
    const [showConfirmReset, setShowConfirmReset] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showEasterEgg, setShowEasterEgg] = useState(false);

    const handleEasterEgg = () => {
        setShowEasterEgg(!showEasterEgg);
    };

    return (
        <div className="header">
            <Row className="text-center align-items-center">
                <Col xs={12} className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center" onClick={handleEasterEgg}>
                        {/* Ajout de l'événement onClick sur le titre */}
                        <h2 style={{ cursor: 'pointer' }}>Score App</h2>
                        {/* Affichage conditionnel du message d'easter egg */}
                        {showEasterEgg && (
                            <span style={{ marginLeft: '10px', color: 'green', fontWeight: 'bold' }}>
                                Créé par Chris 😏
                            </span>
                        )}
                    </div>
                    <Button variant="light" onClick={() => setShowParams(!showParams)}>⚙</Button>
                </Col>
            </Row>

            {/* Utilisation de Collapse pour afficher/masquer les boutons */}
            <Collapse in={showParams}>
                <div>
                    <Row className="header-buttons mt-3">
                        <Col xs={6}>
                            <Button variant="info" onClick={() => setShowPlayerSetup(true)} style={{ width: "100%" }}>Joueurs</Button>
                        </Col>
                        <Col xs={3}>
                            <Button variant="success" onClick={() => setShowOptions(true)}>Options</Button>
                        </Col>
                        <Col xs={3}>
                            <Button variant="danger" onClick={() => setShowConfirmReset(true)}>Reset</Button>
                        </Col>
                    </Row>
                </div>
            </Collapse>

            {/* Utilisation du composant Confetti pour gérer les confettis */}
            <Confetti showEasterEgg={showEasterEgg} />

            {/* Modals */}
            <ModalPlayerSetup show={showPlayerSetup} setShow={setShowPlayerSetup} />
            <ModalConfirmReset show={showConfirmReset} setShow={setShowConfirmReset} />
            <ModalOptions show={showOptions} setShow={setShowOptions} />
        </div>
    );
};

export default Header;
