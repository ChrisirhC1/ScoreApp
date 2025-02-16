import { Button, Modal, Table } from 'react-bootstrap';
import { usePlayers } from '../../../context/PlayerContext';
import { useState } from 'react';

const ModalClassement = ({ show, setShow }) => {

    const { getPlayers } = usePlayers();

    // Créez une copie de la liste des joueurs avant de la trier
    const sortedPlayers = [...getPlayers()].sort((a, b) => b.score - a.score);

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Classement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {getPlayers().length === 0 ? (
                        <p>Aucun joueur n'a été ajouté</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Joueur</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedPlayers.map((player, index) => (
                                    <tr key={player.id}>
                                        <td>{index + 1}</td>
                                        <td>{player.name}</td>
                                        <td>{player.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalClassement;
