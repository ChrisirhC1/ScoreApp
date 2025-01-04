import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import PlayerCard from '../components/playerCard/PlayerCard';

const Home = () => {
    // Liste des joueurs avec des scores initialement chargés à partir du localStorage
    const [players, setPlayers] = useState([
        { name: 'Alice', score: parseInt(localStorage.getItem('Alice')) || 0 },
        { name: 'Bob', score: parseInt(localStorage.getItem('Bob')) || 0 },
        { name: 'Charlie', score: parseInt(localStorage.getItem('Charlie')) || 0 },
        { name: 'David', score: parseInt(localStorage.getItem('David')) || 0 },
        { name: 'Eve', score: parseInt(localStorage.getItem('Eve')) || 0 }
    ]);

    // Fonction pour mettre à jour le score d'un joueur
    const updateScore = (name, newScore) => {
        setPlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.name === name ? { ...player, score: newScore } : player
            )
        );
    };

    const resetScores = () => {
        // Réinitialiser les scores dans le state local seulement si le score est différent de 0

        if (players.some(player => player.score !== 0)) {

            setPlayers(prevPlayers =>
                prevPlayers.map(player => ({ ...player, score: 0 }))
            );

            // Réinitialiser les scores dans le localStorage
            const resetScores = {};
            players.forEach(player => {
                resetScores[player.name] = 0;
            });
            localStorage.setItem('scores', JSON.stringify(resetScores));

            console.log("Scores réinitialisés !");
            window.location.reload();
        }
    };


    return (
        <Container className="mt-1">
            <Row className="mb-4">
                <Col xs={3}></Col>
                <Col xs={6}>
                    <h1 className="text-center mb-4">Score App</h1>
                </Col>
                <Col xs={3}>
                    <Button variant="primary" onClick={() => resetScores()} >Reset</Button>
                </Col>
            </Row>

            <Row>

                {players.map(player => (
                    <Col xs={6} sm={6} md={4} lg={4} xl={2} xxl={2} key={player.name}>
                        <PlayerCard
                            key={player.name}
                            player={player}
                            onScoreChange={updateScore}
                        />
                    </Col>
                ))}


            </Row>
        </Container>
    );
}

export default Home;
