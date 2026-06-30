import { useState, useRef } from 'react';
import './PlayerCard.css';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { usePlayers } from '../../context/PlayerContext';
import ModalMoreScore from '../modal/modalMoreScore/ModalMoreScore';

const PlayerCard = ({ playerData }) => {
  const { addPoints, removePoints, isNegativeScore } = usePlayers();
  const { id: playerId, name: playerName, score: playerScore } = playerData;

  const [totalScorePlus, setTotalScorePlus] = useState(0);
  const [showTotalScorePlus, setShowTotalScorePlus] = useState(false);
  const [showMoreScore, setShowMoreScore] = useState(false);

  const timeoutRef = useRef(null);

  const updateScore = (value) => {
    if (!isNegativeScore && playerScore + value < 0) {
      removePoints(playerId, playerScore);
      return;
    }
    value > 0 ? addPoints(playerId, value) : removePoints(playerId, Math.abs(value));
    setTotalScorePlus((prev) => prev + value);
    setShowTotalScorePlus(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowTotalScorePlus(false);
      setTotalScorePlus(0);
    }, 3000);
  };

  return (
    <>
      <div className="player-card mb-3">
        <Card>
          <Card.Body className="d-flex flex-column gap-2 p-3">
            <Card.Title onClick={() => setShowMoreScore(true)}>
              {playerName}
            </Card.Title>

            <Row className="align-items-center mb-1">
              <Col xs={9} className="d-flex flex-column align-items-center">
                <span className="score-value">{playerScore}</span>
                <span className="score-label">points</span>
              </Col>
              <Col xs={3} className="d-flex align-items-center">
                {showTotalScorePlus && (
                  <span className={`score-delta ${totalScorePlus > 0 ? 'text-success' : 'text-danger'}`}>
                    {totalScorePlus > 0 ? `+${totalScorePlus}` : totalScorePlus}
                  </span>
                )}
              </Col>
            </Row>

            <Row className="g-2">
              <Col xs={6}>
                <Button variant="success" onClick={() => updateScore(1)}>+</Button>
              </Col>
              <Col xs={6}>
                <Button variant="danger" onClick={() => updateScore(-1)}>−</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <ModalMoreScore
        showMoreScore={showMoreScore}
        setShowMoreScore={setShowMoreScore}
        playerName={playerName}
        playerScore={playerScore}
        updateScore={updateScore}
        totalScorePlus={totalScorePlus}
        setTotalScorePlus={setTotalScorePlus}
      />
    </>
  );
};

export default PlayerCard;
