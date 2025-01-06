import { Button, Col, Row, Collapse } from "react-bootstrap";
import './header.css';
import { useState } from "react";
import ModalPlayerSetup from "../modal/modalPlayerSetup/ModalPlayerSetup";
import ModalConfirmReset from "../modal/modalConfirm/ModalConfirmReset";

const Header = () => {
    const [showPlayerSetup, setShowPlayerSetup] = useState(false);
    const [showParams, setShowParams] = useState(false);  // Initialement masqué
    const [showConfirmReset, setShowConfirmReset] = useState(false);

    return (
        <div className="header">
            <Row className="text-center">
                <Col xs={12} className="d-flex justify-content-between">
                    <h2>Score App</h2>
                    <Button variant="primary" onClick={() => setShowParams(!showParams)}>⚙</Button>
                </Col>
            </Row>

            {/* Utilisation de Collapse pour afficher/masquer les boutons */}
            <Collapse in={showParams}>
                <div>
                    <Row className="header-buttons mt-3">
                        <Col xs={6}>
                            <Button variant="info" onClick={() => setShowPlayerSetup(true)}><strong>Joueurs</strong></Button>
                        </Col>
                        <Col xs={6}>
                            <Button variant="danger" onClick={() => setShowConfirmReset(true)}><strong> Reset</strong></Button>
                        </Col>
                    </Row>
                </div>
            </Collapse>

            {/* Modal pour la configuration des joueurs */}
            <ModalPlayerSetup show={showPlayerSetup} setShow={setShowPlayerSetup} />

            {/* Modal pour la confirmation de réinitialisation */}
            <ModalConfirmReset show={showConfirmReset} setShow={setShowConfirmReset} />
        </div>
    );
}

export default Header;
