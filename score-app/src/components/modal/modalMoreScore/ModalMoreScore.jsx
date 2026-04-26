import { Button, Col, Modal, Row } from "react-bootstrap";
import "./modalMoreScore.css";
import { useState } from "react";

const ModalMoreScore = ({
  showMoreScore,
  setShowMoreScore,
  playerName,
  playerScore,
  updateScore,
  totalScorePlus,
  setTotalScorePlus,
}) => {
  const [isEditingScore, setIsEditingScore] = useState(false);
  const [newScore, setNewScore] = useState(playerScore);

  const handleClose = () => {
    setShowMoreScore(false);
    setTotalScorePlus(0);
    setIsEditingScore(false);
  };

  const updateScoreLocal = async (value) => {
    // console.log(`Update score by: ${value}`);
    // Appeler ici la fonction de mise à jour du score si nécessaire
    (await updateScore(value))
      ? setTotalScorePlus(totalScorePlus + value)
      : null;
  };

  const handleScoreClick = () => {
    setIsEditingScore(true);
    setNewScore(playerScore);
  };

  const handleScoreChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setNewScore(value);
    }
  };

  const handleScoreSubmit = async () => {
    const scoreValue = parseInt(newScore) || 0;
    const difference = scoreValue - playerScore;
    if (difference !== 0) {
      await updateScore(difference);
      setTotalScorePlus(totalScorePlus + difference);
    }
    setIsEditingScore(false);
  };

  const handleScoreBlur = () => {
    handleScoreSubmit();
  };

  const handleScoreKeyPress = (e) => {
    if (e.key === "Enter") {
      handleScoreSubmit();
    } else if (e.key === "Escape") {
      setIsEditingScore(false);
    }
  };

  const scoreOptions = [1, 2, 5, 10, 100, 1000];

  return (
    <Modal
      show={showMoreScore}
      onHide={handleClose}
      style={{
        width: "70%",
        top: "10%",
        transform: "translateX(-50%)",
        left: "50%",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{playerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Row className="justify-content-between mb-2">
          <Col xs="4" className="d-flex flex-column align-items-end"></Col>
          <Col xs="4" className="d-flex flex-column align-items-center">
            {isEditingScore ? (
              <input
                type="text"
                value={newScore}
                onChange={handleScoreChange}
                onBlur={handleScoreBlur}
                onKeyDown={handleScoreKeyPress}
                autoFocus
                style={{
                  fontSize: "2rem",
                  textAlign: "center",
                  width: "120px",
                  border: "2px solid #0d6efd",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              />
            ) : (
              <h1
                onClick={handleScoreClick}
                style={{ cursor: "pointer", userSelect: "none" }}
                title="Cliquer pour modifier"
              >
                {playerScore}
              </h1>
            )}
            <p>Points</p>
          </Col>
          <Col
            xs="4"
            className="d-flex flex-column align-items-start justify-content-centser"
          >
            {totalScorePlus > 0 ? (
              <h3 className="text-success">+{totalScorePlus}</h3>
            ) : totalScorePlus < 0 ? (
              <h3 className="text-danger">{totalScorePlus}</h3>
            ) : null}
          </Col>
        </Row>
        {scoreOptions.map((value) => (
          <Row
            className="justify-content-center mb-2 btn-moreScore"
            key={value}
          >
            <Col xs="6">
              <Button variant="success" onClick={() => updateScoreLocal(value)}>
                +{value}
              </Button>
            </Col>
            <Col xs="6">
              <Button variant="danger" onClick={() => updateScoreLocal(-value)}>
                -{value}
              </Button>
            </Col>
          </Row>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default ModalMoreScore;
