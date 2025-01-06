import { Button, Modal, Table } from 'react-bootstrap';
import { usePlayers } from '../../../context/PlayerContext';
import { useState } from 'react';


const ModalClassement = ({ show, setShow }) => {

    const { getPlayers } = usePlayers();


    


    return (

        <>

        <Modal show={show} onHide={setShow}>
            <Modal.Header closeButton>
                <Modal.Title>Classement</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Joueur</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getPlayers().map((player, index) => {
                            const playerName = Object.keys(player)[0];
                            const score = Object.values(player)[0];
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{playerName}</td>
                                    <td>{score}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                    
            </Modal.Body>

            <Modal.Footer>
                <Button variant='secondary' onClick={() => setShow(false)}>Fermer</Button>
            </Modal.Footer>

        </Modal>

        
        </>

    );


};


export default ModalClassement;