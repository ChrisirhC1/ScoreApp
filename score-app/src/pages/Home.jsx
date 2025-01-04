import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
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

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Score App</h1>
            <Row xs={6}>

                {players.map(player => (
                    <Col xs={6}>
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
