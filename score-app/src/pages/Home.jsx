import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import PlayerCard from '../components/playerCard/PlayerCard';
import ModalPlayerSetup from '../components/modalPlayerSetup/ModalPlayerSetup';
import Footer from '../components/footer/Footer';
import { getScores, setScores, updateScores } from '../data/LocalStorageData';

const Home = () => {
    const [players, setPlayers] = useState([]);
    const [showPlayerSetup, setShowPlayerSetup] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState('');

    useEffect(() => {
        const savedScores = getScores() || {};
        if (Object.keys(savedScores).length === 0) {
            setShowPlayerSetup(true);
        } else {
            const initialPlayers = Object.keys(savedScores).map(name => ({ name, score: savedScores[name] }));
            setPlayers(initialPlayers);
        }
    }, []);

    const handleAddPlayer = useCallback(() => {
        if (!newPlayerName.trim()) return;
        setPlayers(prev => [...prev, { name: newPlayerName, score: 0 }]);
        setNewPlayerName('');
    }, [newPlayerName]);

    const handleModifyPlayer = useCallback((index, newName) => {
        setPlayers(prev => prev.map((player, i) =>
            i === index ? { ...player, name: newName } : player
        ));
    }, []);

    const finishPlayerSetup = () => {
        const initialScores = players.reduce((acc, player) => {
            acc[player.name] = player.score;
            return acc;
        }, {});
        setScores(initialScores);
        setShowPlayerSetup(false);
    };

    const updateScore = useCallback((name, newScore) => {
        setPlayers(prevPlayers => prevPlayers.map(player =>
            player.name === name ? { ...player, score: newScore } : player
        ));
        updateScores(name, newScore);
    }, []);

    const resetScores = () => {
        const updatedPlayers = players.map(player => ({ ...player, score: 0 }));
        setPlayers(updatedPlayers);
        const updatedScores = updatedPlayers.reduce((acc, player) => {
            acc[player.name] = player.score;
            return acc;
        }, {});
        setScores(updatedScores);
        window.location.reload();
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

            <Footer />
        </Container>
    );
}

export default Home;
