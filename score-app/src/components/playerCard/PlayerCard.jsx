import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './PlayerCard.css';
import ModalPlayerCard from '../modalPlayerCard/ModalPlayerCard';
import { getScores, updateScores } from '../../data/LocalStorageData';

const PlayerCard = ({ player, onScoreChange }) => {
    const [score, setScore] = useState(() => {
        const savedScores = getScores() || {};
        return savedScores[player.name] ?? 0;
    });
    const [showModal, setShowModal] = useState(false);
    const [shakeError, setShakeError] = useState(false);

    useEffect(() => {
        updateScores(player.name, score);
    }, [score, player.name]);

    const updateScore = useCallback((delta) => {
        const newScore = score + delta;

        if (score === 0 && delta < 0) {
            setShakeError(true);
            setTimeout(() => setShakeError(false), 300);
            return;
        }

        const finalScore = newScore < 0 ? 0 : newScore;
        setScore(finalScore);
        onScoreChange(player.name, finalScore);
    }, [score, onScoreChange, player.name]);

    const toggleModal = () => setShowModal(!showModal);

    return (
        <>
            <div className="mb-4">
                <Card className="text-center">
                    <Card.Body className="d-flex flex-column">
                        <Card.Title onClick={toggleModal}>
                            {player.name}
                        </Card.Title>
                        <Card.Text className={shakeError ? 'shake' : ''}>
                            <strong style={{ fontSize: "1.5em" }}>{score}</strong> Points
                        </Card.Text>
                        <Row>
                            <Col xs={12} sm={6}>
                                <Button variant="success" onClick={() => updateScore(1)}>+</Button>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Button variant="danger" onClick={() => updateScore(-1)}>-</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>

            {showModal && (
                <ModalPlayerCard player={player} score={score} updateScore={updateScore} showModal={showModal} onHide={toggleModal}/>
            )}
        </>
    );
};

export default PlayerCard;
