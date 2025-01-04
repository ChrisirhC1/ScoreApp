import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const ModalPlayerCard = ({ player, score, updateScore, showModal, onHide }) => {
    const scoreOptions = [1, 2, 5];

    return (
        <Modal show={showModal} onHide={onHide} centered className='modal'>
            <Modal.Header>
                <Modal.Title>{player.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong style={{ fontSize: "1.5em" }}>{score}</strong> Points</p>
                {scoreOptions.map((value) => (
                    <Row key={value} className="mb-2">
                        <Col xs={6}>
                            <Button variant="success" onClick={() => updateScore(value)}>+{value}</Button>
                        </Col>
                        <Col xs={6}>
                            <Button variant="danger" onClick={() => updateScore(-value)}>-{value}</Button>
                        </Col>
                    </Row>
                ))}
            </Modal.Body>
        </Modal>
    );
};

export default ModalPlayerCard;
