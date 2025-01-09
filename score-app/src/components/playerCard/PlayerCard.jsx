import React, { useState, useEffect, useCallback, useRef } from 'react';
import './PlayerCard.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { usePlayers } from '../../context/PlayerContext';
import ModalMoreScore from '../modal/modalMoreScore/ModalMoreScore';


const PlayerCard = ({ playerData, index }) => {

    const { addPoints, removePoints, getAllowNegativeScores } = usePlayers();
    const playerName = Object.keys(playerData)[0];
    const playerScore = Object.values(playerData)[0];
    const [totalScorePlus, setTotalScorePlus] = useState(0);
    const [showTotalScorePlus, setShowTotalScorePlus] = useState(false);

    const [showMoreScore, setShowMoreScore] = useState(false);


    const timeoutRef = useRef(null);

    const updateScore = async (value) => {
        if (getAllowNegativeScores() === false && playerScore + value < 0) {
            
            removePoints(index, playerScore)
            return false;
        }
        value > 0 ? addPoints(index, value) : removePoints(index, Math.abs(value));
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
                        <Card.Text >
                            <Row>
                                <Col xs={3} >
                                </Col>
                                <Col xs={6} >
                                    <strong style={{ fontSize: "1.5em" }}>{playerScore}</strong> Points
                                </Col>

                                <Col xs={3} className='d-flex justify-content-start align-items-center'>
                                    {showTotalScorePlus && (
                                        <>
                                            <strong>{totalScorePlus > 0 ? <p className="text-success">+{totalScorePlus}</p> : totalScorePlus < 0 ? <p className="text-danger">{totalScorePlus}</p> : null}</strong>
                                        </>
                                    )}
                                </Col>

                            </Row>
                        </Card.Text>
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

            <ModalMoreScore showMoreScore={showMoreScore} setShowMoreScore={setShowMoreScore} playerName={playerName} playerScore={playerScore} updateScore={updateScore} totalScorePlus={totalScorePlus} setTotalScorePlus={setTotalScorePlus} index={index} />
        </>
    );
};

export default PlayerCard;
