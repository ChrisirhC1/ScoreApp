import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalPlayerSetup = ({
    show,
    newPlayerName,
    setNewPlayerName,
    handleAddPlayer,
    handleModifyPlayer,
    finishPlayerSetup,
    players,
}) => {
    const [isEditing, setIsEditing] = useState(false); // Gérer l'état d'édition
    const [editingPlayerIndex, setEditingPlayerIndex] = useState(null); // Indice du joueur en édition
    const [editingPlayerName, setEditingPlayerName] = useState(''); // Nom du joueur en édition

    // Activer le mode édition pour un joueur
    const startEditing = (index) => {
        setEditingPlayerIndex(index);
        setEditingPlayerName(players[index].name); // Charger le nom du joueur à modifier
        setIsEditing(true);
    };

    const handleEditChange = (e) => {
        setEditingPlayerName(e.target.value); // Mettre à jour le nom du joueur en édition
    };

    const saveEdit = () => {
        if (editingPlayerName.trim() !== '') {
            handleModifyPlayer(editingPlayerIndex, editingPlayerName); // Appeler la fonction de modification avec l'indice et le nom modifié
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
                    <Button variant="success" onClick={handleAddPlayer}>
                        Ajouter
                    </Button>
                </Form>

                {!isEditing ? (
                    <>
                        <ul className="mt-3">
                            {players.map((player, index) => (
                                <li key={index} onClick={() => startEditing(index)}>
                                    {player?.name} ✏
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <>
                        <ul className="mt-3">
                            <li>
                                <input
                                    type="text"
                                    value={editingPlayerName}
                                    onChange={handleEditChange}
                                />
                            </li>
                        </ul>
                        <Button variant="warning" onClick={saveEdit}>
                            Enregistrer
                        </Button>
                    </>
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
