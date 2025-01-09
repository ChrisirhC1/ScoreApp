
import { Button, Col, Row } from 'react-bootstrap';
import './footer.css';
import { useState } from 'react';
import ModalClassement from '../modal/modalClassement/ModalClassement';
import { usePlayers } from '../../context/PlayerContext';

const Footer = () => {

    const [showClassement, setShowClassment] = useState(false);
    const { getPlayers } = usePlayers();

    return (
        <>
            <Row className="text-center footer">
                <Col xs={12}>


                    <Button
                        variant="success"
                        size='lg'
                        onClick={() => setShowClassment(!showClassement)}
                        disabled={getPlayers().length === 0}
                    >classement</Button>


                </Col>
            </Row>


            <ModalClassement show={showClassement} setShow={() => setShowClassment(!showClassement)} />
        </>
    );
};

export default Footer;