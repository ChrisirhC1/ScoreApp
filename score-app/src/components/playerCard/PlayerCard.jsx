import React, { useState, useEffect, useCallback } from 'react';
import './PlayerCard.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { usePlayers } from '../../context/PlayerContext';


const PlayerCard = ({ playerData, index }) => {

    const { addPoints, removePoints } = usePlayers();

    const [player, setPlayer] = useState({
        name: Object.keys(playerData)[0],
        score: Object.values(playerData)[0]
    });

    const updateScore = useCallback((value) => {
        console.log('Updating score for player', index, value);

        if (value > 0) {
            addPoints(index, value);
        } else {
            removePoints(index, Math.abs(value));
        }
    }, [addPoints, removePoints, index]);
   
    return (
        <>
         <div className="player-card mb-4 ">
                <Card className="text-center">
                    <Card.Body className="d-flex flex-column">
                        <Card.Title >
                            {player.name}
                        </Card.Title>
                        <Card.Text >
                            <strong style={{ fontSize: "1.5em" }}>{player.score}</strong> Points
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
           
        </>
    );
};

export default PlayerCard;
