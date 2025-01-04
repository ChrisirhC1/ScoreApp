import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalPlayerSetup = ({ show, setShow, newPlayerName, setNewPlayerName, handleAddPlayer, handleModifyPlayer, finishPlayerSetup, players }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingPlayerIndex, setEditingPlayerIndex] = useState(null);
    const [editingPlayerName, setEditingPlayerName] = useState('');

    // Activer l'édition pour un joueur
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
