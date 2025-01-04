import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import PlayerCard from '../components/playerCard/PlayerCard';
import ModalPlayerCard from '../components/modalPlayerCard/ModalPlayerCard';
import ModalPlayerSetup from '../components/modalPlayerSetup/ModalPlayerSetup';

const Home = () => {
    const [players, setPlayers] = useState([]);
    const [showPlayerSetup, setShowPlayerSetup] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState('');

    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem('scores')) || {};
        if (Object.keys(savedScores).length === 0) {
            setShowPlayerSetup(true);
        } else {
            const initialPlayers = Object.keys(savedScores).map(name => ({ name, score: savedScores[name] }));
            setPlayers(initialPlayers);
        }
    }, []);

    const handleAddPlayer = () => {
        if (newPlayerName.trim() === '') return;
        const newPlayers = [...players, { name: newPlayerName, score: 0 }];
        setPlayers(newPlayers);
        setNewPlayerName('');
    };

    const handleModifyPlayer = (index, newName) => {
        const newPlayers = [...players];
        newPlayers[index].name = newName;
        setPlayers(newPlayers); // Mettre à jour l'état des joueurs
    };

    const finishPlayerSetup = () => {
        const initialScores = {};
        players.forEach(player => initialScores[player.name] = player.score);
        localStorage.setItem('scores', JSON.stringify(initialScores));
        setShowPlayerSetup(false);
    };


    const updateScore = (name, newScore) => {
        setPlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.name === name ? { ...player, score: newScore } : player
            )
        );
    };

    const resetScores = () => {
        setPlayers(prevPlayers => prevPlayers.map(player => ({ ...player, score: 0 })));
        localStorage.setItem('scores', JSON.stringify({}));
        window.location.reload();
    };

    const toggleModal = () => setShowPlayerSetup(!showPlayerSetup);


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
                            key={player.name}
                            player={player}
                            onScoreChange={updateScore}
                        />
                    </Col>
                ))}
            </Row>

            <ModalPlayerSetup
                show={showPlayerSetup}
                onHide={toggleModal}
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
