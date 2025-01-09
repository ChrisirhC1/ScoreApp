import { Button, Col, Modal, Row } from "react-bootstrap";
import './modalMoreScore.css';

const ModalMoreScore = ({ showMoreScore, setShowMoreScore, playerName, playerScore, updateScore, index }) => {

    const handleClose = () => setShowMoreScore(false);

    const updateScoreLocal = (value) => {
        console.log(`Update score by: ${value}`);
        // Appeler ici la fonction de mise à jour du score si nécessaire
        updateScore(value);
    };

    const scoreOptions = [1, 2, 5];

    return (
        <Modal show={showMoreScore} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>{playerName}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <p>Score : {playerScore}</p>
                {scoreOptions.map((value) => (
                    <Row className="justify-content-center mb-2 btn-moreScore" key={index}>
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
