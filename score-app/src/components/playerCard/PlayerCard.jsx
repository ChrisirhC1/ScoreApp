import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './PlayerCard.css';  // Importez votre fichier CSS où l'animation "shake" est définie

const PlayerCard = ({ player, onScoreChange }) => {
    const [score, setScore] = useState(player.score);
    const [expanded, setExpanded] = useState(false);  // Nouvel état pour savoir si la carte est agrandie
    const [shakeError, setShakeError] = useState(false);  // État pour gérer l'animation d'erreur

    // Mettre à jour le score dans le localStorage lorsque le score change
    useEffect(() => {
        const scores = JSON.parse(localStorage.getItem('scores')) || {};
        scores[player.name] = score;
        localStorage.setItem('scores', JSON.stringify(scores));
    }, [score, player.name]);

    // Fonction de mise à jour du score (empêche les scores négatifs)
    const updateScore = useCallback((delta) => {
        // Calcule le nouveau score
        const newScore = score + delta;

        if (score == 0 && delta < 0) {
            setShakeError(true);  // Active l'animation d'erreur
            setTimeout(() => setShakeError(false), 300);  // Désactive l'animation après 0.3s
            return;
        }

        const finalScore = newScore < 0 ? 0 : newScore;
        setScore(finalScore);
        onScoreChange(player.name, finalScore);
    }, [score, onScoreChange, player.name]);

    // Liste des valeurs de points à ajouter/retirer
    const scoreOptions = [1, 2, 5];

    const toggleCardSize = () => {
        setExpanded(!expanded); // Inverser l'état agrandi
    };

    return (
        <div className=" mb-4">
            <Card className={`text-center ${expanded ? 'expanded-card' : ''}`}>
                <Card.Body className="d-flex flex-column">
                    <Card.Title onClick={toggleCardSize} >
                        {player.name}
                    </Card.Title>
                    <Card.Text className={shakeError ? 'shake' : ''}><strong style={{fontSize:"1.5em"}}>{score}</strong> Points</Card.Text>
                    {!expanded ? (
                        <>
                        <Row>
                            <Col xs={12} sm={6}>
                            <Button variant="success" onClick={() => updateScore(1)}>+</Button>
                            </Col>
                            <Col xs={12} sm={6}>
                            <Button variant="danger"  onClick={() => updateScore(-1)}>-</Button>
                            </Col>
                        </Row>
                            
                        </>
                    ) : (
                        <>
                            {scoreOptions.map((value) => (
                                <Row key={value} className="mb-2">
                                    <Col xs={6}>
                                        <Button variant="success" onClick={() => updateScore(value)}>+{value}</Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button variant="danger" onClick={() => updateScore(-value)}>-{value}</Button>
                                    </Col>
                                </Row>
                            ))}
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default PlayerCard;
