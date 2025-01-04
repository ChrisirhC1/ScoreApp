import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import PlayerCard from '../components/playerCard/PlayerCard';
import ModalPlayerSetup from '../components/modalPlayerSetup/ModalPlayerSetup';

const Home = () => {
    const [players, setPlayers] = useState([]);
    const [showPlayerSetup, setShowPlayerSetup] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState('');

    // Charger les scores au démarrage
    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem('scores')) || {};
        if (Object.keys(savedScores).length === 0) {
            setShowPlayerSetup(true);
        } else {
            const initialPlayers = Object.keys(savedScores).map(name => ({ name, score: savedScores[name] }));
            setPlayers(initialPlayers);
        }
    }, []);

    // Ajouter un joueur
    const handleAddPlayer = useCallback(() => {
        if (!newPlayerName.trim()) return;
        setPlayers(prev => [...prev, { name: newPlayerName, score: 0 }]);
        setNewPlayerName('');
    }, [newPlayerName]);

    // Modifier un joueur
    const handleModifyPlayer = useCallback((index, newName) => {
        setPlayers(prev => prev.map((player, i) =>
            i === index ? { ...player, name: newName } : player
        ));
    }, []);

    // Finaliser la configuration des joueurs
    const finishPlayerSetup = () => {
        const initialScores = players.reduce((acc, player) => {
            acc[player.name] = player.score;
            return acc;
        }, {});
        localStorage.setItem('scores', JSON.stringify(initialScores));
        setShowPlayerSetup(false);
    };

    // Mettre à jour le score d'un joueur
    const updateScore = useCallback((name, newScore) => {
        setPlayers(prevPlayers => prevPlayers.map(player =>
            player.name === name ? { ...player, score: newScore } : player
        ));
    }, []);

    // Réinitialiser les scores
    const resetScores = () => {
        const updatedPlayers = players.map(player => ({ ...player, score: 0 })); // Réinitialiser les scores
        setPlayers(updatedPlayers); // Mettre à jour l'état des joueurs
        const updatedScores = updatedPlayers.reduce((acc, player) => {
            acc[player.name] = player.score; // Mettre à jour les scores dans le format attendu
            return acc;
        }, {});
        localStorage.setItem('scores', JSON.stringify(updatedScores)); // Sauvegarder les scores mis à jour
        window.location.reload(); // Rafraîchir la page pour réinitialiser les animations
    };
    

    return (
        <Container className="mt-1">
            <Row className="mb-4">
                <Col xs={3}>
                    <Button variant="secondary" onClick={() => setShowPlayerSetup(true)}>⚙</Button>
                </Col>
                <Col xs={6}>
                    <h1 className="text-center mb-4">Score App</h1>
                </Col>
                <Col xs={3}>
                    <Button variant="primary" onClick={resetScores}>Reset</Button>
                </Col>
            </Row>

            <Row>
                {players.map(player => (
                    <Col xs={6} sm={6} md={4} lg={4} xl={2} key={player.name}>
                        <PlayerCard
                            player={player}
                            onScoreChange={updateScore}
                        />
                    </Col>
                ))}
            </Row>

            <ModalPlayerSetup
                show={showPlayerSetup}
                setShow={setShowPlayerSetup}
                newPlayerName={newPlayerName}
                setNewPlayerName={setNewPlayerName}
                handleAddPlayer={handleAddPlayer}
                handleModifyPlayer={handleModifyPlayer}
                finishPlayerSetup={finishPlayerSetup}
                players={players}
            />
        </Container>
    );
}

export default Home;
