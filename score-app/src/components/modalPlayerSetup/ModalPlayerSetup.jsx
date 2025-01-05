import React, { useState, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { setScores } from '../../data/LocalStorageData';

const ModalPlayerSetup = ({ show, setShow, players, setPlayers }) => {
    const [newPlayerName, setNewPlayerName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingPlayerIndex, setEditingPlayerIndex] = useState(null);
    const [editingPlayerName, setEditingPlayerName] = useState('');

    const handleAddPlayer = useCallback(() => {
        if (!newPlayerName.trim()) return;
        setPlayers(prev => [...prev, { name: newPlayerName, score: 0 }]);
        setNewPlayerName('');
    }, [newPlayerName, setPlayers]);

    const handleModifyPlayer = useCallback((index, newName) => {
        setPlayers(prev => prev.map((player, i) =>
            i === index ? { ...player, name: newName } : player
        ));
    }, [setPlayers]);

    const finishPlayerSetup = () => {
        const initialScores = players.reduce((acc, player) => {
            acc[player.name] = player.score;
            return acc;
        }, {});
        setScores(initialScores);
        setShow(false);
    };

    const startEditing = (index) => {
        setEditingPlayerIndex(index);
        setEditingPlayerName(players[index].name);
        setIsEditing(true);
    };

    const handleEditChange = (e) => setEditingPlayerName(e.target.value);

    const saveEdit = () => {
        if (editingPlayerName.trim()) {
            handleModifyPlayer(editingPlayerIndex, editingPlayerName);
            setIsEditing(false);
            setEditingPlayerIndex(null);
        }
    };

    return (
        <Modal show={show} backdrop="static" centered>
            <Modal.Header>
                <Modal.Title>Configurer les joueurs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom du joueur</Form.Label>
                        <Form.Control
                            type="text"
                            value={newPlayerName || ''}
                            onChange={(e) => setNewPlayerName(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="success" onClick={handleAddPlayer}>Ajouter</Button>
                </Form>

                <ul className="mt-3">
                    {players.map((player, index) => (
                        <li key={player.name} onClick={() => startEditing(index)}>
                            {player.name} {isEditing && editingPlayerIndex === index ? '✏️' : ''}
                        </li>
                    ))}
                </ul>

                {isEditing && (
                    <div className="mt-3">
                        <input
                            type="text"
                            value={editingPlayerName}
                            onChange={handleEditChange}
                        />
                        <Button variant="warning" onClick={saveEdit}>Enregistrer</Button>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={finishPlayerSetup} disabled={players.length === 0}>
                    C'est parti !
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalPlayerSetup;
