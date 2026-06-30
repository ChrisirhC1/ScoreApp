import { Button, Col, Modal, Row } from "react-bootstrap";
import "./modalMoreScore.css";
import { useState } from "react";

const SCORE_OPTIONS = [1, 2, 5, 10, 100, 1000];

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

  const handleScoreSubmit = () => {
    const scoreValue = parseInt(newScore) || 0;
    const difference = scoreValue - playerScore;
    if (difference !== 0) updateScore(difference);
    setIsEditingScore(false);
  };

  const handleScoreKeyDown = (e) => {
    if (e.key === "Enter") handleScoreSubmit();
    else if (e.key === "Escape") setIsEditingScore(false);
  };

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
        <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
          <div className="d-flex flex-column align-items-center">
            {isEditingScore ? (
              <input
                type="text"
                value={newScore}
                onChange={handleScoreChange}
                onBlur={handleScoreSubmit}
                onKeyDown={handleScoreKeyDown}
                autoFocus
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  textAlign: "center",
                  width: "140px",
                  background: "rgba(124, 58, 237, 0.1)",
                  border: "2px solid #7c3aed",
                  borderRadius: "12px",
                  padding: "6px 10px",
                  color: "var(--c-text)",
                  outline: "none",
                }}
              />
            ) : (
              <span
                onClick={handleScoreClick}
                title="Cliquer pour modifier"
                style={{
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: "var(--c-text)",
                  cursor: "pointer",
                  userSelect: "none",
                  lineHeight: 1,
                }}
              >
                {playerScore}
              </span>
            )}
            <span style={{ fontSize: "0.7rem", color: "var(--c-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>
              points
            </span>
          </div>
          {totalScorePlus !== 0 && (
            <span style={{ fontSize: "1.3rem", fontWeight: 700 }} className={totalScorePlus > 0 ? "text-success" : "text-danger"}>
              {totalScorePlus > 0 ? `+${totalScorePlus}` : totalScorePlus}
            </span>
          )}
        </div>

        {SCORE_OPTIONS.map((value) => (
          <Row className="justify-content-center mb-2 btn-moreScore" key={value}>
            <Col xs="6">
              <Button variant="success" onClick={() => updateScore(value)}>+{value}</Button>
            </Col>
            <Col xs="6">
              <Button variant="danger" onClick={() => updateScore(-value)}>-{value}</Button>
            </Col>
          </Row>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default ModalMoreScore;
