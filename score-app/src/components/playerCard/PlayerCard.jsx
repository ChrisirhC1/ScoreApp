import React, { useState, useEffect, useCallback, useRef } from 'react';
import './PlayerCard.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { usePlayers } from '../../context/PlayerContext';
import ModalMoreScore from '../modal/modalMoreScore/ModalMoreScore';


const PlayerCard = ({ playerData }) => {

    const { addPoints, removePoints, getAllowNegativeScores } = usePlayers();
    const playerId = playerData.id;
    const playerName = playerData.name;
    const playerScore = playerData.score;
    const [totalScorePlus, setTotalScorePlus] = useState(0);
    const [showTotalScorePlus, setShowTotalScorePlus] = useState(false);

    const [showMoreScore, setShowMoreScore] = useState(false);


    const timeoutRef = useRef(null);

    const updateScore = async (value) => {
        if (getAllowNegativeScores() === false && playerScore + value < 0) {

            removePoints(playerId, playerScore)
            return false;
        }
        value > 0 ? addPoints(playerId, value) : removePoints(playerId, Math.abs(value));
        setTotalScorePlus(totalScorePlus + value);
        setShowTotalScorePlus(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setShowTotalScorePlus(false);
            setTotalScorePlus(0);
        }, 3000);
    }



    return (
        <>
            <div className="player-card mb-4 ">
                <Card className="text-center">
                    <Card.Body className="d-flex flex-column">
                        <Card.Title onClick={() => setShowMoreScore(true)} >
                            {playerName}
                        </Card.Title>
                        <div className='mb-2'>
                            <Row>
                                <Col xs={3} >
                                </Col>
                                <Col xs={6} >
                                    <strong style={{ fontSize: "1.5em" }}>{playerScore}</strong> Points
                                </Col>

                                <Col xs={3} className='d-flex justify-content-start align-items-center'>
                                    {showTotalScorePlus && (
                                        <>
                                            {/* Utiliser un <span> pour éviter l'erreur de validation du DOM */}
                                            {totalScorePlus > 0 ? (
                                                <div className="text-success"><span><strong>+{totalScorePlus}</strong></span></div>
                                            ) : totalScorePlus < 0 ? (
                                                <div className="text-danger"><span><strong>{totalScorePlus}</strong></span></div>
                                            ) : null}
                                        </>
                                    )}
                                </Col>

                            </Row>
                        </div>
                        <Row>
                            <Col xs={6} sm={6}>
                                <Button variant="success" onClick={() => updateScore(1)}>+</Button>
                            </Col>
                            <Col xs={6} sm={6}>
                                <Button variant="danger" onClick={() => updateScore(-1)}>-</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>

            <ModalMoreScore showMoreScore={showMoreScore} setShowMoreScore={setShowMoreScore} playerName={playerName} playerScore={playerScore} updateScore={updateScore} totalScorePlus={totalScorePlus} setTotalScorePlus={setTotalScorePlus} />
        </>
    );
};

export default PlayerCard;
