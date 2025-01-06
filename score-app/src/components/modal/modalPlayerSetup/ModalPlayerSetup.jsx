import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
// import usePlayers from '../../../hooks/usePlayers';
import { usePlayers } from '../../../context/PlayerContext';

const ModalPlayerSetup = ({ show, setShow }) => {
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [isEditing, setIsEditing] = useState(null); // Gestion de l'édition
    const { players, addPlayer, editPlayer, removePlayer, savePlayers } = usePlayers();

    // Ajout ou modification d'un joueur
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing !== null) {
            editPlayer(isEditing, currentPlayer); // Modifier un joueur existant
            setIsEditing(null); // Réinitialiser le mode édition
        } else {
            addPlayer(currentPlayer); // Ajouter un nouveau joueur
        }
        setCurrentPlayer('');
    };

    // Enregistrement des joueurs dans le localStorage
    const handleSave = () => {
        // savePlayers();
        setShow(false);
    };

    // Passer en mode édition
    const handleEditClick = (index) => {
        const playerName = Object.keys(players[index])[0];
        setCurrentPlayer(playerName);
        setIsEditing(index);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Configuration des joueurs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Formulaire d'ajout/modification */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>{isEditing !== null ? 'Modifier le joueur' : 'Ajouter un joueur'}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nom du joueur"
                            value={currentPlayer}
                            onChange={(e) => setCurrentPlayer(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" disabled={!currentPlayer.trim()}>
                        {isEditing !== null ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Form>

                {/* Liste des joueurs avec options Modifier / Supprimer */}
                <ListGroup className="mt-3">
                    {players.map((player, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            {Object.keys(player)[0]}
                            <div>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEditClick(index)}
                                >
                                    Modifier
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removePlayer(index)}
                                    disabled={isEditing !== null}
                                >
                                    Supprimer
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>

            <Modal.Footer>
                {/* <Button variant="success" onClick={handleSave} disabled={players.length === 0}>
                    Enregistrer
                </Button> */}
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalPlayerSetup;
