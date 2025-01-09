import React, { useState, useEffect, useCallback } from 'react';
import './PlayerCard.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { usePlayers } from '../../context/PlayerContext';
import ModalMoreScore from '../modal/modalMoreScore/ModalMoreScore';


const PlayerCard = ({ playerData, index }) => {

    const { addPoints, removePoints } = usePlayers();
    const playerName = Object.keys(playerData)[0];
    const playerScore = Object.values(playerData)[0];

    const [showMoreScore, setShowMoreScore] = useState(false);


    const updateScore = (value) => {
        value > 0 ? addPoints(index, value) : removePoints(index, Math.abs(value));
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
                            <strong style={{ fontSize: "1.5em" }}>{playerScore}</strong> Points
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

            <ModalMoreScore showMoreScore={showMoreScore} setShowMoreScore={setShowMoreScore} playerName={playerName} playerScore={playerScore} updateScore={updateScore} index={index} />
        </>
    );
};

export default PlayerCard;
