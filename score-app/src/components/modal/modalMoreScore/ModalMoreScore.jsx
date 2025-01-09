import { Button, Col, Modal, Row } from "react-bootstrap";
import './modalMoreScore.css';
import { useState } from "react";

const ModalMoreScore = ({ showMoreScore, setShowMoreScore, playerName, playerScore, updateScore, index }) => {

    const handleClose = () => {
        
        setShowMoreScore(false);
        setTotalScorePlus(0);
    };
    const [totalScorePlus, setTotalScorePlus] = useState(0);

    const updateScoreLocal = (value) => {
        console.log(`Update score by: ${value}`);
        // Appeler ici la fonction de mise à jour du score si nécessaire
        setTotalScorePlus(totalScorePlus + value);
        updateScore(value);
    };

    const scoreOptions = [1, 2, 5];

    return (
        <Modal show={showMoreScore} onHide={handleClose} style={{
            width: '70%',
            top: '10%',
            transform: 'translateX(-50%)',
            left: '50%'
        }}>
            <Modal.Header closeButton>
                <Modal.Title>{playerName}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <Row className="justify-content-between mb-2">
                    <Col xs="4" className="d-flex flex-column align-items-end">
                    </Col>
                    <Col xs="4" className="d-flex flex-column align-items-center">
                        <h1>{playerScore}</h1>
                        <p>Points</p>
                    </Col>
                    <Col xs="4" className="d-flex flex-column align-items-start justify-content-centser">

                        {totalScorePlus > 0 ? <h3 className="text-success">+{totalScorePlus}</h3> : totalScorePlus < 0 ? <h3 className="text-danger">{totalScorePlus}</h3> : null}

                    </Col>
                </Row>
                {scoreOptions.map((value) => (
                    <Row className="justify-content-center mb-2 btn-moreScore" key={value}>
                        <Col xs="6">
                            <Button variant="success" onClick={() => updateScoreLocal(value)}>+{value}</Button>
                        </Col>
                        <Col xs="6">
                            <Button variant="danger" onClick={() => updateScoreLocal(-value)}>-{value}</Button>
                        </Col>
                    </Row>
                ))}
            </Modal.Body>

        </Modal>
    );
};

export default ModalMoreScore;